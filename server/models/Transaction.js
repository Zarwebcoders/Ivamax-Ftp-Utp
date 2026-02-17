const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, enum: ['IMX', 'USDT', 'INR'], default: 'IMX' },
    type: {
        type: String,
        enum: ['Deposit', 'Withdrawal', 'Staking', 'ROI', 'DirectReward', 'BinaryReward', 'RankReward', 'PMR', 'FCR'],
        required: true
    },
    status: { type: String, enum: ['Pending', 'Completed', 'Failed', 'Rejected'], default: 'Completed' },
    description: { type: String },
    txHash: { type: String }, // For blockchain tx if any
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
