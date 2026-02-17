const User = require('../models/User');

// Get Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
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
