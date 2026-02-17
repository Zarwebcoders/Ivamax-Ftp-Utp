const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const stakeController = require('../controllers/stakeController');

// Create Stake
router.post('/invest', auth, stakeController.invest);

// Get My Stakes
router.get('/', auth, stakeController.getMyStakes);

module.exports = router;
