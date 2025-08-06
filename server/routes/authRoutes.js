const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const User = require('../models/user'); // Add this line

const authController = new AuthController(User); // Pass User model

router.post('/register', authController.registerUser.bind(authController));
router.post('/login', authController.loginUser.bind(authController));

module.exports = router;