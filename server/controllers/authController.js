const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate next User ID
const generateUserId = async () => {
    const lastUser = await User.findOne().sort({ createdAt: -1 });
    if (!lastUser) return 'IVA100001';

    const lastId = parseInt(lastUser.userId.replace('IVA', ''));
    return `IVA${lastId + 1}`;
};

// Register User
exports.register = async (req, res) => {
    try {
        const { name, email, password, mobile, sponsorId, placement } = req.body;

        // Check existing
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Generate ID
        const userId = await generateUserId();
        const referralCode = userId; // Simple referral code strategy

        let parentId = null;
        let finalPlacement = placement || 'Left'; // Default to Left
        let validSponsorId = sponsorId;

        // Verify Sponsor & Placement Logic
        if (sponsorId) {
            const sponsor = await User.findOne({ userId: sponsorId });
            if (!sponsor) return res.status(400).json({ message: 'Invalid Sponsor ID' });

            // Binary Tree Logic: Find the extreme node on the chosen side
            let currentNode = sponsor;
            while (true) {
                const child = await User.findOne({ parentId: currentNode.userId, placement: finalPlacement });
                if (!child) {
                    parentId = currentNode.userId;
                    break;
                }
                currentNode = child;
            }
        } else {
            // If no sponsor (Root node case), ensure no other users exist or handle as Admin
            const count = await User.countDocuments();
            if (count > 0) return res.status(400).json({ message: 'Sponsor ID required' });
            validSponsorId = 'ROOT';
            parentId = 'ROOT';
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userId,
            name,
            email,
            mobile,
            password: hashedPassword,
            plainPassword: password, // Saving plain password
            sponsorId: validSponsorId,
            parentId: parentId,
            placement: finalPlacement,
            referralCode,
            isActive: true, // Auto active for now or waiting for payment? Default active as per existing code.
            role: (await User.countDocuments()) === 0 ? 'admin' : 'user' // First user is Admin
        });

        await newUser.save();

        // Create Token
        const token = jwt.sign({ id: newUser._id, userId: newUser.userId, role: newUser.role }, process.env.JWT_SECRET || 'ivamax_secret_key', { expiresIn: '1d' });

        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                userId: newUser.userId,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                referralCode: newUser.referralCode
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { userId, password } = req.body;

        const user = await User.findOne({ userId });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, userId: user.userId }, process.env.JWT_SECRET || 'ivamax_secret_key', { expiresIn: '1d' });

        res.json({
            token,
            user: {
                id: user._id,
                userId: user.userId,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
