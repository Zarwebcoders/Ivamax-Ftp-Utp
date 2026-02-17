const mongoose = require('mongoose');

const SupportTicketSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ticketId: { type: String, required: true, unique: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    category: { type: String, enum: ['General', 'Technical', 'Payment', 'Account'], default: 'General' },
    status: { type: String, enum: ['Open', 'In Progress', 'Resolved', 'Closed'], default: 'Open' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    adminReply: { type: String },
    attachments: [{ type: String }], // URLs to images if any
}, { timestamps: true });

module.exports = mongoose.model('SupportTicket', SupportTicketSchema);
