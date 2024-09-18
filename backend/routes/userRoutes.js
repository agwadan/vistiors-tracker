// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController'); // Import the controller

// Define the routes and map them to controller methods
router.post('/register', usersController.registerUser);
router.post('/check-in', usersController.checkInOutUser);

module.exports = router;
