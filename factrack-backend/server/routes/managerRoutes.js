const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Manager = require('../models/Manager');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Manager Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const manager = await Manager.findOne({ username });
  if (!manager) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, manager.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign({ role: 'manager' }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token, { httpOnly: true, secure: false }).json({
    success: true,
    message: 'Login successful',
  });
});

// Protected Manager Dashboard
router.get('/dashboard', authenticateUser, (req, res) => {
  res.json({ success: true, message: 'Welcome to Manager Dashboard' });
});

module.exports = router;
