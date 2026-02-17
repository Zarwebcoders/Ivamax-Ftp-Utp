const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const walletController = require('../controllers/walletController');

// Get Wallet Balance
router.get('/', auth, walletController.getBalance);

// Deposit (Simulated)
router.post('/deposit', auth, walletController.deposit);

// Transfer
router.post('/transfer', auth, walletController.transfer);

// Withdraw
router.post('/withdraw', auth, walletController.withdraw);

// History
router.get('/history', auth, walletController.getTransactions);

module.exports = router;
