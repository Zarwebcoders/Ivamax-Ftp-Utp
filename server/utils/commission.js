const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Distribute Direct & Level Commission
exports.distributeLevelCommission = async (stakerId, amount) => {
    try {
        let currentUser = await User.findById(stakerId);
        let currentUserId = currentUser.sponsorId;

        // Configuration: Level Percentages
        const levelPercents = [10, 5, 2, 1, 1]; // Level 1 to 5

        for (let i = 0; i < levelPercents.length; i++) {
            if (!currentUserId || currentUserId === 'ROOT' || currentUserId === 'ADMIN') break;

            const sponsor = await User.findOne({ userId: currentUserId });
            if (!sponsor) break;

            const commission = (amount * levelPercents[i]) / 100;

            if (commission > 0 && sponsor.isActive) {
                // Add to Protok (Reward) Wallet using 'profit' field as per User model
                // checking User model: wallet.protok.profit
                sponsor.wallet.protok.profit += commission;

                // Update Business Stats
                sponsor.business.totalTeam += amount; // Simplified logic, usually separate volume tracking

                await sponsor.save();

                // Log Transaction
                const tx = new Transaction({
                    userId: sponsor._id,
                    amount: commission,
                    type: 'DirectReward', // Or LevelReward depending on level
                    status: 'Completed',
                    description: `Level ${i + 1} Commission from ${currentUser.userId}`
                });
                await tx.save();
            }

            // Move up
            currentUserId = sponsor.sponsorId;
        }

        // Binary Business Update (Left/Right Volume)
        // We need to traverse up the Binary Tree (parentId) and add volume to Left or Right leg.
        let binaryNode = await User.findById(stakerId);
        while (binaryNode.parentId && binaryNode.parentId !== 'ROOT') {
            const parent = await User.findOne({ userId: binaryNode.parentId });
            if (!parent) break;

            // Check if current node is Left or Right child of parent
            // We can check placements but easier if we stored 'position' in child. 
            // schema has 'placement' which is the desired placement, but once placed, 
            // we need to know effectively where they are.
            // Actually `placement` in User schema seems to be the PREFERENCE or the ACTUAL position?
            // In my authController, I set `placement` to the preference. 
            // But when traversing UP, we need to know which leg we came from.
            // Let's re-read User.js... it has `placement` enum ['Left', 'Right'].
            // In my authLogic: `currentNode = await User.findOne({ parentId: ..., placement: ... })`
            // So `placement` field IS the position relative to parentId. Perfect.

            if (binaryNode.placement === 'Left') {
                parent.business.leftBusiness += amount;
            } else {
                parent.business.rightBusiness += amount;
            }
            parent.business.totalTeam += amount;
            await parent.save();

            binaryNode = parent;
        }

    } catch (err) {
        console.error('Commission Error:', err);
    }
};
