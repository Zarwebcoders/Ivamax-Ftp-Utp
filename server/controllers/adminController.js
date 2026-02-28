const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get Pending Deposits
exports.getPendingDeposits = async (req, res) => {
    try {
        const deposits = await Transaction.find({ type: 'Deposit', status: 'Pending' }).populate('userId', 'name email userId');
        res.json(deposits);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Approve Deposit
exports.approveDeposit = async (req, res) => {
    try {
        const { transactionId } = req.body;
        const tx = await Transaction.findById(transactionId);

        if (!tx) return res.status(404).json({ message: 'Transaction not found' });
        if (tx.status !== 'Pending') return res.status(400).json({ message: 'Transaction already processed' });

        const user = await User.findById(tx.userId);
        user.wallet.captok.main += tx.amount;
        await user.save();

        tx.status = 'Completed';
        await tx.save();

        res.json({ message: 'Deposit Approved', balance: user.wallet.captok.main });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Reject Deposit
exports.rejectDeposit = async (req, res) => {
    try {
        const { transactionId } = req.body;
        const tx = await Transaction.findById(transactionId);

        if (!tx) return res.status(404).json({ message: 'Transaction not found' });
        if (tx.status !== 'Pending') return res.status(400).json({ message: 'Transaction already processed' });

        tx.status = 'Rejected';
        await tx.save();

        res.json({ message: 'Deposit Rejected' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get Dashboard Stats
exports.getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalInvested = await Transaction.aggregate([
            { $match: { type: 'Staking', status: 'Completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        res.json({
            totalUsers,
            totalInvested: totalInvested[0] ? totalInvested[0].total : 0
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Declare Weekly PSP (UTP Only)
exports.declareWeeklyPSP = async (req, res) => {
    try {
        const { percentage } = req.body;
        if (!percentage || percentage <= 0) {
            return res.status(400).json({ message: "Invalid percentage value" });
        }

        // "USP ENTRY TAKES BEFORE MONDAY THEN ONLY COUNT CURRENT WEEK PSP" (Image 1 Rule)
        // Get the most recent Monday at 00:00:00 of the current week
        const now = new Date();
        const day = now.getDay(); // 0 is Sunday, 1 is Monday... 6 is Saturday
        const diffToMonday = now.getDate() - day + (day === 0 ? -6 : 1);
        const lastMonday = new Date(now.setDate(diffToMonday));
        lastMonday.setHours(0, 0, 0, 0);

        // Fetch eligible UTP stakes (Active and started before this week's Monday)
        const Stake = require('../models/Stake');
        const activeUtpStakes = await Stake.find({
            status: 'Active',
            planType: 'UTP',
            createdAt: { $lt: lastMonday }
        });

        let totalDistributed = 0;

        for (const stake of activeUtpStakes) {
            const profit = (stake.amount * percentage) / 100;

            // Update Stake
            stake.totalProfit += profit;
            stake.lastRoiDate = new Date();
            await stake.save();

            // Credit User
            const user = await User.findById(stake.userId);
            if (user) {
                user.wallet.protok.profit += profit;
                await user.save();

                // Log Transaction
                const tx = new Transaction({
                    userId: user._id,
                    amount: profit,
                    type: 'ROI',
                    status: 'Completed',
                    description: `Weekly UTP Profit Sharing: ${percentage}%`
                });
                await tx.save();

                totalDistributed += profit;
            }
        }

        res.json({
            message: `Weekly PSP of ${percentage}% distributed successfully.`,
            stakesProcessed: activeUtpStakes.length,
            totalAmountDistributed: totalDistributed
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get All Withdrawals
exports.getWithdrawals = async (req, res) => {
    try {
        const withdrawals = await Transaction.find({ type: 'Withdrawal' })
            .populate('userId', 'name email userId walletAddress')
            .sort({ createdAt: -1 });
        res.json(withdrawals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Handle Withdrawal (Approve / Reject)
exports.handleWithdrawal = async (req, res) => {
    try {
        const { transactionId, action } = req.body; // action: 'approve' or 'reject'
        const tx = await Transaction.findById(transactionId);

        if (!tx) return res.status(404).json({ message: 'Transaction not found' });
        if (tx.status !== 'Pending') return res.status(400).json({ message: 'Transaction already processed' });

        const user = await User.findById(tx.userId);

        if (action === 'approve') {
            tx.status = 'Completed';
            // Adjust user requested balance (deduct what was requested)
            user.wallet.protok.released = (user.wallet.protok.released || 0) + tx.amount;
            user.wallet.protok.requested = (user.wallet.protok.requested || 0) - tx.amount;
            if (user.wallet.protok.requested < 0) user.wallet.protok.requested = 0;

        } else if (action === 'reject') {
            tx.status = 'Rejected';
            tx.description = tx.description + " (Rejected)";

            // Refund the user's ProTok profit balance
            user.wallet.protok.profit += tx.amount;
            // Deduct from requested
            user.wallet.protok.requested = (user.wallet.protok.requested || 0) - tx.amount;
            if (user.wallet.protok.requested < 0) user.wallet.protok.requested = 0;
        } else {
            return res.status(400).json({ message: 'Invalid action' });
        }

        await user.save();
        await tx.save();

        res.json({ message: `Withdrawal ${action}d successfully.`, transaction: tx });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get All Stakes (Investments)
exports.getStakes = async (req, res) => {
    try {
        const Stake = require('../models/Stake');
        const stakes = await Stake.find()
            .populate('userId', 'name email userId')
            .sort({ createdAt: -1 });
        res.json(stakes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
