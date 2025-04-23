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
      remarks,
      isDeleted: 0,
    });

    const saved = await newManager.save();
    res.status(201).json(saved);

  } catch (error) {
    console.error('Error adding manager:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch All Managers
router.get('/fetch-managers', async (req, res) => {
  try {
    // Fetch all managers from the database
    const fetchedManagers = await AddManager.find();
    // console.log(`fetched managers list data from backend is:-`, fetchedManagers)

    res.json({
      success: true,
      data: fetchedManagers,
    });
  } catch (err) {
    console.error('Error fetching managers:', err);
    res.status(500).json({ success: false, message: 'Server error while fetching managers' });
  }
});

// Update a manager
router.put('/update-manager/:id', async (req, res) => {
  try {
    const updatedManager = await AddManager.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedManager) return res.status(404).json({ message: 'Manager not found' });
    res.json(updatedManager);
  } catch (err) {
    let message = 'Update failed';
    if (err.code === 11000) {
      if (err.keyPattern?.email) message = 'Email already exists';
      else if (err.keyPattern?.username) message = 'Username already exists';
    }
    res.status(400).json({ message });
  }
});

// Soft delete a manager by setting isDeleted to 1
router.put('/delete-manager/:id', async (req, res) => {
  try {
    const manager = await AddManager.findByIdAndUpdate(
      req.params.id,
      { isDeleted: 1 },
      { new: true }
    );

    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }

    res.json({ success: true, message: 'Manager deleted (soft delete) successfully', data: manager });
  } catch (err) {
    console.error('Error deleting manager:', err);
    res.status(500).json({ success: false, message: 'Server error while deleting manager' });
  }
});

module.exports = router;