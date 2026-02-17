const User = require('../models/User');
const Stake = require('../models/Stake');
const Transaction = require('../models/Transaction');

// Invest
exports.invest = async (req, res) => {
    try {
        const { planType, amount, durationMonths } = req.body;
        const user = await User.findById(req.user.id);

        // Check Balance (CapTok Main)
        if (user.wallet.captok.main < amount) {
            return res.status(400).json({ message: 'Insufficient Balance' });
        }

        // Deduct Balance
        user.wallet.captok.main -= amount;
        user.wallet.captok.used += Number(amount);
        await user.save();

        // Create Stake
        const newStake = new Stake({
            userId: user._id,
            planType,
            amount,
            durationMonths,
            roiPercentage: planType === 'FTP' ? 3 : 5,
            maturityDate: new Date(new Date().setMonth(new Date().getMonth() + durationMonths))
        });
        await newStake.save();

        // Log Transaction
        const tx = new Transaction({
            userId: user._id,
            amount,
            type: 'Staking',
            status: 'Completed',
            description: `Invested in ${planType} Plan`
        });
        await tx.save();

        // Distribute Commissions
        const { distributeLevelCommission } = require('../utils/commission');
        distributeLevelCommission(user._id, amount);

        res.json({ message: 'Staking Successful', stake: newStake });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get My Stakes
exports.getMyStakes = async (req, res) => {
    try {
        const stakes = await Stake.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(stakes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
