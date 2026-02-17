const cron = require('node-cron');
const Stake = require('../models/Stake');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const calculateDailyROI = async () => {
    console.log('Running Daily ROI Calculation...');
    try {
        const activeStakes = await Stake.find({ status: 'Active' });

        for (const stake of activeStakes) {
            // Calculate Daily ROI
            // Assuming 30 days month
            const dailyRoiAmount = (stake.amount * stake.roiPercentage) / 100 / 30;

            // Update Stake
            stake.totalProfit += dailyRoiAmount;
            stake.lastRoiDate = new Date();

            // Check Maturity
            if (new Date() >= stake.maturityDate) {
                stake.status = 'Completed';
                console.log(`Stake ${stake._id} Matured`);
            }
            await stake.save();

            // Credit User
            const user = await User.findById(stake.userId);
            if (user) {
                user.wallet.protok.profit += dailyRoiAmount;
                await user.save();

                // Log Transaction
                const tx = new Transaction({
                    userId: user._id,
                    amount: dailyRoiAmount,
                    type: 'ROI',
                    status: 'Completed',
                    description: `Daily ROI for ${stake.planType} Plan`
                });
                await tx.save();

                // TODO: Distribute Level Income on ROI (if applicable) or on Stake Amount (One time)
                // PRD says: "On new stake: Commission distributed up the chain" -> This should be in Stake Controller
                // PRD says: "Daily Reward Generation" -> This is what we are doing here.
            }
        }
        console.log('Daily ROI Calculation Completed');
    } catch (err) {
        console.error('Error in Daily ROI Cron:', err);
    }
};

// Schedule: Run every day at midnight
cron.schedule('0 0 * * *', calculateDailyROI);

module.exports = calculateDailyROI; // Export for manual trigger testing
