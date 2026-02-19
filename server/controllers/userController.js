const User = require('../models/User');

// Get Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        let sponsorName = 'N/A';
        if (user.sponsorId) {
            const sponsor = await User.findOne({ userId: user.sponsorId }).select('name');
            if (sponsor) sponsorName = sponsor.name;
        }
        res.json({ ...user.toObject(), sponsorName });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get Direct Team
exports.getDirectTeam = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const directs = await User.find({ sponsorId: user.userId }).select('userId name doj rank status business');
        res.json(directs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get Network Tree
exports.getNetworkTree = async (req, res) => {
    try {
        const nodeId = req.params.nodeId !== 'null' ? req.params.nodeId : req.user.userId;
        const root = await User.findOne({ userId: nodeId }).select('userId name rank placement business');

        if (!root) return res.status(404).json({ message: 'User not found' });

        // Find immediate children (Left/Right)
        const leftChild = await User.findOne({ sponsorId: root.userId, placement: 'Left' }).select('userId name rank business');
        const rightChild = await User.findOne({ sponsorId: root.userId, placement: 'Right' }).select('userId name rank business');

        res.json({
            root,
            left: leftChild,
            right: rightChild
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');

        if (!user) return res.status(404).json({ message: 'User not found' });

        // 1. Direct Team Counts
        const directTeamCount = await User.countDocuments({ sponsorId: user.userId });
        const activeDirectTeamCount = await User.countDocuments({ sponsorId: user.userId, isActive: true });
        const inactiveDirectTeamCount = directTeamCount - activeDirectTeamCount;

        // 2. Total Team Size (Recursive / GraphLookup)
        // We use graphLookup to find all descendants
        const teamAggregation = await User.aggregate([
            { $match: { userId: user.userId } },
            {
                $graphLookup: {
                    from: 'users',
                    startWith: '$userId',
                    connectFromField: 'userId',
                    connectToField: 'sponsorId',
                    as: 'downline',
                    depthField: 'level'
                }
            },
            {
                $project: {
                    totalTeamSize: { $size: '$downline' },
                    activeTeamSize: {
                        $size: {
                            $filter: {
                                input: '$downline',
                                as: 'member',
                                cond: { $eq: ['$$member.isActive', true] }
                            }
                        }
                    }
                }
            }
        ]);

        const totalTeamSize = teamAggregation[0]?.totalTeamSize || 0;
        const activeTeamSize = teamAggregation[0]?.activeTeamSize || 0;
        const inactiveTeamSize = totalTeamSize - activeTeamSize;

        // 3. Stakes / Investment Info
        const Stake = require('../models/Stake');
        const stakes = await Stake.find({ userId: user._id });
        const activeStakes = stakes.filter(s => s.status === 'Active'); // Assuming there's a status or date check
        // Or just all stakes if no status field, usually checks maturityDate > now

        // Calculate Total Invested
        const totalInvested = stakes.reduce((acc, curr) => acc + curr.amount, 0);

        // FTP & UTP Specifics
        const ftpStakes = stakes.filter(s => s.planType === 'FTP');
        const utpStakes = stakes.filter(s => s.planType === 'UTP');

        const ftpInvested = ftpStakes.reduce((acc, curr) => acc + curr.amount, 0);
        const utpInvested = utpStakes.reduce((acc, curr) => acc + curr.amount, 0);

        // Sponsor Info
        let sponsorName = 'N/A';
        let sponsorAddress = 'N/A';
        if (user.sponsorId) {
            const sponsor = await User.findOne({ userId: user.sponsorId }).select('name walletAddress');
            if (sponsor) {
                sponsorName = sponsor.name;
                sponsorAddress = sponsor.walletAddress || 'N/A';
            }
        }

        // Construct Response
        const dashboardData = {
            // User & Profile
            user: {
                name: user.name,
                username: user.userId,
                email: user.email,
                rank: user.rank,
                sponsorName,
                sponsorAddress
            },

            // Wallet & Financials (from User model)
            wallet: user.wallet,

            // Business Stats (from User model + calculations)
            business: {
                self: totalInvested, // or user.business.self
                directTeam: user.business.directTeam, // Volume? Or use calculated volume? Model says default 0
                team: user.business.totalTeam // Volume
            },

            // Team Counts (Calculated)
            teamCounts: {
                direct: directTeamCount,
                activeDirect: activeDirectTeamCount,
                inactiveDirect: inactiveDirectTeamCount,
                total: totalTeamSize,
                activeTotal: activeTeamSize,
                inactiveTotal: inactiveTeamSize
            },

            // Plans
            plans: {
                slots: activeStakes.length,
                totalInvestment: totalInvested,
                ftp: {
                    invested: ftpInvested,
                    // pro balance is in wallet.protok.ftp if separated, but model has generic protok
                },
                utp: {
                    invested: utpInvested,
                    unit: 0 // Placeholder if UTP unit logic differs
                }
            }
        };

        res.json(dashboardData);

    } catch (err) {
        console.error("Dashboard Error:", err);
        res.status(500).json({ message: err.message });
    }
};
