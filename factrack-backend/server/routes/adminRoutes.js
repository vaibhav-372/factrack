const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authenticateAdmin = require('../middleware/authMiddleware.cjs');
const AddManager = require('../models/Admin')
require('dotenv').config();

const router = express.Router();

// Admin Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  
    // This is the correct way (you can include username/email in token payload)
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' });  
    res.json({ success: true, message: 'Admin login successful', token, // send token to frontend
    });
  });


// Adding New Manager
router.post('/add-managers', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      dept,
      DOJ,
      managerID,
      qualification,
      salary,
      username,
      remarks
    } = req.body;

    // Check for existing email or username
    const existingEmail = await AddManager.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Manager with this email already exists' });
    }

    const existingUsername = await AddManager.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    const newManager = new AddManager({
      name,
      email,
      phone,
      dept,
      DOJ,
      managerID,
      qualification,
      salary,
      username,
      remarks
    });

    const saved = await newManager.save();
    res.status(201).json(saved);

  } catch (error) {
    console.error('Error adding manager:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;