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
        const rootId = req.params.nodeId && req.params.nodeId !== 'null' ? req.params.nodeId : req.user.userId;

        // Fetch user and all downlines perfectly
        const result = await User.aggregate([
            { $match: { userId: rootId } },
            {
                $graphLookup: {
                    from: 'users',
                    startWith: '$userId',
                    connectFromField: 'userId',
                    connectToField: 'sponsorId',
                    as: 'downline',
                    depthField: 'level' // optional
                }
            }
        ]);

        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const rootItem = result[0];
        const allNodes = [rootItem, ...(rootItem.downline || [])];

        // 1. Map all nodes by userId
        const map = {};
        allNodes.forEach(n => {
            // Defaulting values safely
            map[n.userId] = { ...n, childrenArray: [] };
        });

        // 2. Build Memory Tree links based on sponsorId
        allNodes.forEach(n => {
            if (n.sponsorId && map[n.sponsorId] && n.userId !== rootId) {
                map[n.sponsorId].childrenArray.push(map[n.userId]);
            }
        });

        // 3. Format recursively and calculate exact team size and business for each node
        const formatNode = (memNode, currentDepth, maxDepth) => {
            // Gather all descendants for accurate team stats counting
            const descendants = [];
            const gatherDescendants = (node) => {
                node.childrenArray.forEach(child => {
                    descendants.push(child);
                    gatherDescendants(child);
                });
            };
            gatherDescendants(memNode);

            const teamSize = descendants.length;
            const teamBus = descendants.reduce((acc, curr) => acc + (curr.wallet?.captok?.used || 0), 0);
            const selfBus = memNode.wallet?.captok?.used || 0;

            let formattedChildren = [];
            // Process children if depth allows
            if (currentDepth < maxDepth) {
                // Sort children by date of join (optional)
                memNode.childrenArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                formattedChildren = memNode.childrenArray.map(child => formatNode(child, currentDepth + 1, maxDepth));
            }

            return {
                id: memNode.userId,
                name: memNode.name,
                rank: memNode.rank || 'Member',
                self: `$${selfBus.toFixed(2)}`,
                team: teamSize.toString(),
                teamBus: `$${teamBus.toFixed(2)}`,
                children: formattedChildren
            };
        };

        // Output formatting up to 3 levels deep (0 = root, 1 = children, 2 = grandchildren, 3 = great-grandchildren)
        const treeData = formatNode(map[rootId], 0, 4);

        res.json(treeData);

    } catch (err) {
        console.error("Tree Error:", err);
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
        res.status(500).json({ message: err.message });
    }
};

// Get Business Overview (For Business.jsx)
exports.getBusinessOverview = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        // 1. Self Business = USP STAKE + DSP STAKE = CAPTOK USED
        const selfBusiness = user.wallet.captok.used || 0;
        const usedBalance = user.wallet.captok.used || 0; // "CAPTOK USED = BUSINESS"

        // 2. Direct Team Count
        const directTeamCount = await User.countDocuments({ sponsorId: user.userId });

        // 3. Total Team Size (GraphLookup)
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
            }
        ]);
        const totalTeamSize = teamAggregation[0]?.downline?.length || 0;

        // 4. Team Business (Total business of all downline members)
        let teamBusiness = 0;
        if (teamAggregation[0] && teamAggregation[0].downline) {
            const downlineMembers = teamAggregation[0].downline;
            // Business is the sum of their CapTok Used (which is USP + DSP stake)
            teamBusiness = downlineMembers.reduce((acc, curr) => acc + (curr.wallet?.captok?.used || 0), 0);
        }

        res.json({
            selfBusiness,
            directTeamCount,
            totalTeamSize,
            teamBusiness,
            usedBalance
        });

    } catch (err) {
        console.error("Business Overview Error:", err);
        res.status(500).json({ message: err.message });
    }
};
