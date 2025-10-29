const express = require('express');
const router = express.Router();
const { login, getProfile } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// Login route
router.post('/login', login);

// Get profile (protected route)
router.get('/profile', authenticateToken, getProfile);

module.exports = router;