// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route to get dashboard data: checked-in users & count of checked-out users today
router.get('/dashboard', adminController.getAdminDashboardData);

module.exports = router;
