const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController'); 

router.post('/register', usersController.registerUser);
router.post('/check-in', usersController.checkInOutUser);

module.exports = router;
