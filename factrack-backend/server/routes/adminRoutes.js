const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authenticateUser = require('../middleware/authMiddleware');
require('dotenv').config();

const router = express.Router();

// Admin Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  
    // This is the correct way (you can include username/email in token payload)
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });
  
    res.json({
      success: true,
      message: 'Admin login successful',
      token, // send token to frontend
    });
  });
// Protected Admin Dashboard
router.get('/dashboard', authenticateUser, (req, res) => {
  res.json({ success: true, message: 'Welcome to Admin Dashboard' });
});

module.exports = router;
