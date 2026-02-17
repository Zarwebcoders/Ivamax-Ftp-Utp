const mongoose = require('mongoose');

const StakeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planType: { type: String, enum: ['FTP', 'UTP'], required: true }, // Fixed Term or Unit Term
    amount: { type: Number, required: true }, // Investment amount
    durationMonths: { type: Number, required: true },
    roiPercentage: { type: Number, default: 0 }, // Monthly ROI %

    // Status
    status: { type: String, enum: ['Active', 'Completed', 'Closed'], default: 'Active' },

    // Dates
    startDate: { type: Date, default: Date.now },
    maturityDate: { type: Date },
    lastRoiDate: { type: Date },

    // Earnings
    totalProfit: { type: Number, default: 0 },
    paidProfit: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model('Stake', StakeSchema);
