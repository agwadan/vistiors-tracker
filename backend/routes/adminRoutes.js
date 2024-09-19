const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route to get all currently checked-in users
router.get('/checked-in', adminController.getCheckedInUsers);

module.exports = router;
