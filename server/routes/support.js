const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { createTicket, getMyTickets, getAllTickets, replyTicket } = require('../controllers/supportController');

// User Routes
router.post('/create', verifyToken, createTicket);
router.get('/my-tickets', verifyToken, getMyTickets);

// Admin Routes (To be protected by admin middleware later)
router.get('/all', verifyToken, getAllTickets);
router.post('/reply', verifyToken, replyTicket);

module.exports = router;
