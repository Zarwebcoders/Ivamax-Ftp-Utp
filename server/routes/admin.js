const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/adminAuth');
const { getAllUsers, getPendingDeposits, approveDeposit, rejectDeposit, getAdminStats } = require('../controllers/adminController');

router.use(verifyAdmin); // Protect all routes

router.get('/users', getAllUsers);
router.get('/deposits/pending', getPendingDeposits);
router.post('/deposits/approve', approveDeposit);
router.post('/deposits/reject', rejectDeposit);
router.get('/stats', getAdminStats);

// Declare Weekly Profit Sharing Percentage (PSP) for UTP
const { declareWeeklyPSP, getWithdrawals, handleWithdrawal, getStakes } = require('../controllers/adminController');
router.post('/psp/declare', declareWeeklyPSP);

// New Routes for Admin Panel UI
router.get('/withdrawals', getWithdrawals);
router.post('/withdrawals/action', handleWithdrawal);
router.get('/stakes', getStakes);

module.exports = router;
