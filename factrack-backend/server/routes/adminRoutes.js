const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authenticateUser = require('../middleware/authMiddleware');
require('dotenv').config();

const router = express.Router();

// Admin Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if the username matches the one in .env
  if (username !== process.env.ADMIN_USERNAME) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  // Compare password with the .env stored password (hashed version recommended)
  const isMatch = await bcrypt.compare(password, await bcrypt.hash(process.env.ADMIN_PASSWORD, 10));
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token, { httpOnly: true, secure: false }).json({
    success: true,
    message: 'Admin login successful',
  });
});

// Protected Admin Dashboard
router.get('/dashboard', authenticateUser, (req, res) => {
  res.json({ success: true, message: 'Welcome to Admin Dashboard' });
});

module.exports = router;
