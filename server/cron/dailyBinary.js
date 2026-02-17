const cron = require('node-cron');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const calculateBinaryCommission = async () => {
    console.log('Running Binary Commission Calculation...');
    try {
        const users = await User.find({ isActive: true });

        for (const user of users) {
            const leftVol = user.business.leftBusiness;
            const rightVol = user.business.rightBusiness;

            // Binary Matching Logic
            // 1:1 Matching
            if (leftVol > 0 && rightVol > 0) {
                const matchedVolume = Math.min(leftVol, rightVol);

                // Apply Commission % (e.g., 10%)
                const commissionRate = 10;
                const commission = (matchedVolume * commissionRate) / 100;

                // Cap Limit per day (Flashout)
                const maxCap = 5000; // Example Capping
                const finalCommission = Math.min(commission, maxCap);

                if (finalCommission > 0) {
                    // Credit to Wallet
                    user.wallet.protok.profit += finalCommission;

                    // Deduct Matched Volume (Carry Forward remaining)
                    user.business.leftBusiness -= matchedVolume;
                    user.business.rightBusiness -= matchedVolume;

                    await user.save();

                    // Log Transaction
                    const tx = new Transaction({
                        userId: user._id,
                        amount: finalCommission,
                        type: 'BinaryReward',
                        status: 'Completed',
                        description: `Binary Matching Bonus on ${matchedVolume} Volume`
                    });
                    await tx.save();
                }
            }
        }
        console.log('Binary Commission Calculation Completed');
    } catch (err) {
        console.error('Error in Binary Commission:', err);
    }
};

// Schedule: Run every day at 1 AM
cron.schedule('0 1 * * *', calculateBinaryCommission);

module.exports = calculateBinaryCommission;
