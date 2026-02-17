const SupportTicket = require('../models/SupportTicket');
const User = require('../models/User');

// Generate Ticket ID
const generateTicketId = async () => {
    const count = await SupportTicket.countDocuments();
    return `TKT${100000 + count + 1}`;
};

// Create Ticket
exports.createTicket = async (req, res) => {
    try {
        const { subject, message, category, priority } = req.body;
        const ticketId = await generateTicketId();

        const newTicket = new SupportTicket({
            userId: req.user.id,
            ticketId,
            subject,
            message,
            category,
            priority
        });

        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get My Tickets
exports.getMyTickets = async (req, res) => {
    try {
        const tickets = await SupportTicket.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get All Tickets (Admin)
exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await SupportTicket.find().populate('userId', 'name email userId').sort({ createdAt: -1 });
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Reply to Ticket (Admin)
exports.replyTicket = async (req, res) => {
    try {
        const { ticketId, reply, status } = req.body;
        const ticket = await SupportTicket.findOne({ ticketId });

        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

        ticket.adminReply = reply;
        ticket.status = status || 'Resolved';
        await ticket.save();

        res.json(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
