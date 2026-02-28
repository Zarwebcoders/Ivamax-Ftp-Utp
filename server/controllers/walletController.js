const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Get Balance
exports.getBalance = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('wallet');
        res.json(user.wallet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Deposit
exports.deposit = async (req, res) => {
    try {
        const { amount } = req.body;
        const user = await User.findById(req.user.id);

        // Update Balance
        user.wallet.captok.main += Number(amount);
        await user.save();

        // Log Transaction
        const tx = new Transaction({
            userId: user._id,
            amount,
            type: 'Deposit',
            status: 'Completed',
            description: 'Deposit to CapTok Main Wallet'
        });
        await tx.save();

        res.json({ message: 'Deposit successful', balance: user.wallet.captok.main });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Buy IMX (Direct Auto-Approve)
exports.buyImx = async (req, res) => {
    try {
        const { slots } = req.body;
        const user = await User.findById(req.user.id);

        if (!slots || slots < 1) {
            return res.status(400).json({ message: 'Invalid slots quantity' });
        }

        const imxAmount = slots * 250;
        const usdValue = slots * 25;

        // Auto-approve and add directly to balance
        user.wallet.captok.main += imxAmount;
        if (!user.isActive) {
            user.isActive = true; // $25 minimum investment met
        }
        await user.save();

        // Log Transaction as Completed
        const tx = new Transaction({
            userId: user._id,
            amount: imxAmount,
            type: 'Deposit',
            status: 'Completed',
            description: `Buy IMX: ${slots} Lot(s) for $${usdValue}`
        });
        await tx.save();

        res.json({ message: 'IMX Purchased Successfully', balance: user.wallet.captok.main });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Transfer (P2P)
exports.transfer = async (req, res) => {
    try {
        const { recipientId, amount } = req.body;
        const sender = await User.findById(req.user.id);
        const recipient = await User.findOne({ userId: recipientId });

        if (!recipient) return res.status(404).json({ message: 'Recipient not found' });
        if (sender.wallet.captok.main < amount) return res.status(400).json({ message: 'Insufficient Balance' });

        // Deduct from Sender
        sender.wallet.captok.main -= Number(amount);
        await sender.save();

        // Add to Recipient
        recipient.wallet.captok.main += Number(amount);
        await recipient.save();

        // Log Transactions
        await new Transaction({ userId: sender._id, amount, type: 'Transfer', status: 'Completed', description: `Transfer to ${recipientId}` }).save();
        await new Transaction({ userId: recipient._id, amount, type: 'Transfer', status: 'Completed', description: `Received from ${sender.userId}` }).save();

        res.json({ message: 'Transfer Successful' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Withdraw Request
exports.withdraw = async (req, res) => {
    try {
        const { amount, address } = req.body;
        const user = await User.findById(req.user.id);

        if (user.wallet.protok.profit < amount) return res.status(400).json({ message: 'Insufficient Profit Balance' });

        user.wallet.protok.profit -= Number(amount);
        user.wallet.protok.released = (user.wallet.protok.released || 0) + Number(amount);
        await user.save();

        const tx = new Transaction({
            userId: user._id,
            amount,
            type: 'Withdrawal',
            status: 'Pending',
            description: `Withdrawal to ${address}`
        });
        await tx.save();

        res.json({ message: 'Withdrawal Requested' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get Transactions
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(10);
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
