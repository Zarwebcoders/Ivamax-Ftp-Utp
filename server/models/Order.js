const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['BuyToken', 'BuyStake'], required: true },

    // Amounts
    amount: { type: Number, required: true }, // In currency (USDT/INR)
    tokenAmount: { type: Number }, // Quantity of tokens

    // Details
    lotSize: { type: Number },
    pricePerLot: { type: Number },

    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    paymentProof: { type: String }, // Path to image or Transaction ID

}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
