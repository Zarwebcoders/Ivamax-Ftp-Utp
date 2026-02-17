const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // generated ID like IVA100001
    password: { type: String, required: true },
    plainPassword: { type: String }, // Storing plain text password as requested
    name: { type: String, required: true },
    email: { type: String },
    mobile: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    referralCode: { type: String, unique: true },
    sponsorId: { type: String, ref: 'User' },
    parentId: { type: String, ref: 'User' }, // Binary Tree Parent
    placement: { type: String, enum: ['Left', 'Right'] },
    rank: { type: String, default: 'Member' },
    walletAddress: { type: String },
    doj: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: false },

    // Wallet References (or embedded)
    wallet: {
        captok: {
            main: { type: Number, default: 0 },
            used: { type: Number, default: 0 },
            free: { type: Number, default: 0 }
        },
        protok: {
            profit: { type: Number, default: 0 },
            requested: { type: Number, default: 0 },
            released: { type: Number, default: 0 }
        }
    },

    // Business Stats
    business: {
        self: { type: Number, default: 0 },
        directTeam: { type: Number, default: 0 },
        totalTeam: { type: Number, default: 0 },
        leftBusiness: { type: Number, default: 0 },
        rightBusiness: { type: Number, default: 0 }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
