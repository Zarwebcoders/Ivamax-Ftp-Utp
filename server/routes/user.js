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

// Get Dashboard Stats
router.get('/dashboard', auth, userController.getDashboardStats);

// Get Business Overview
router.get('/business', auth, userController.getBusinessOverview);

module.exports = router;
