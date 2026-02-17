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
