const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ message: 'Access Denied' });

        const verified = jwt.verify(token, process.env.JWT_SECRET || 'ivamax_secret_key');
        req.user = verified;

        const user = await User.findById(req.user.id);
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin Access Required' });
        }

        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = verifyAdmin;
