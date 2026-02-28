const User = require('../models/User');
const Stake = require('../models/Stake');
const Transaction = require('../models/Transaction');

// Invest
exports.invest = async (req, res) => {
    try {
        const { planType, amount, durationMonths } = req.body;
        const user = await User.findById(req.user.id);

        // Minimum Investment check
        if (amount < 50) {
            return res.status(400).json({ message: 'Minimum investment is $50' });
        }

        // UTP (USP) must be multiple of $50
        if (planType === 'UTP' && amount % 50 !== 0) {
            return res.status(400).json({ message: 'UTP Investment must be in multiples of $50' });
        }

        // Check Balance (CapTok Main)
        if (user.wallet.captok.main < amount) {
            return res.status(400).json({ message: 'Insufficient Balance' });
        }

        // Deduct Balance
        user.wallet.captok.main -= amount;
        user.wallet.captok.used += Number(amount);
        await user.save();

        // Calculate ROI Percentage based on plan type and slabs (from image)
        let dailyRoiPercentage = 0;
        let roiStartDate = Date.now();
        let maturityDate = null; // No fixed maturity date globally now

        if (planType === 'FTP' || planType === 'DRP') { // DRP/DSP
            if (amount >= 100000) dailyRoiPercentage = 0.350;
            else if (amount >= 75000) dailyRoiPercentage = 0.325;
            else if (amount >= 50000) dailyRoiPercentage = 0.300;
            else if (amount >= 25000) dailyRoiPercentage = 0.275;
            else if (amount >= 10000) dailyRoiPercentage = 0.250;
            else if (amount >= 5000) dailyRoiPercentage = 0.225;
            else if (amount >= 2500) dailyRoiPercentage = 0.200;
            else if (amount >= 1000) dailyRoiPercentage = 0.175;
            else if (amount >= 500) dailyRoiPercentage = 0.150;
            else if (amount >= 250) dailyRoiPercentage = 0.125;
            else dailyRoiPercentage = 0.100; // base for $50+

            // ROI starts after 7 days
            roiStartDate = new Date();
            roiStartDate.setDate(roiStartDate.getDate() + 7);
        }

        // Create Stake
        const newStake = new Stake({
            userId: user._id,
            planType,
            amount,
            durationMonths: durationMonths || 0, // Any time entry/exit
            roiPercentage: dailyRoiPercentage,
            roiStartDate: roiStartDate,
            maturityDate: maturityDate
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

// Unstake / Exit Plan
exports.unstake = async (req, res) => {
    try {
        const { stakeId } = req.body;
        const user = await User.findById(req.user.id);
        const stake = await Stake.findOne({ _id: stakeId, userId: user._id, status: 'Active' });

        if (!stake) {
            return res.status(404).json({ message: 'Active stake not found' });
        }

        // Refund capital logic (return to CapTok or ProTok depending on business logic, here returning to CapTok)
        user.wallet.captok.main += stake.amount;
        user.wallet.captok.used -= stake.amount;
        await user.save();

        stake.status = 'Completed';
        await stake.save();

        const tx = new Transaction({
            userId: user._id,
            amount: stake.amount,
            type: 'Unstake',
            status: 'Completed',
            description: `Exited ${stake.planType} Plan - Capital Returned`
        });
        await tx.save();

        res.json({ message: 'Unstake successful, capital returned.', stake });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
