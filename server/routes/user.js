const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

// Get User Profile
router.get('/profile', auth, userController.getProfile);

// Get Direct Team (Referrals)
router.get('/direct-team', auth, userController.getDirectTeam);

// Get Network Tree (Downline)
router.get('/tree/:nodeId', auth, userController.getNetworkTree);

module.exports = router;
