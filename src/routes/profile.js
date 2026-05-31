const express = require('express');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const { name, email, phone, status, role } = req.user;
    return res.json({ user: { name, email, phone, status, role } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to load profile.' });
  }
});

router.put('/', authenticate, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const currentEmail = req.user.email.toLowerCase().trim();

    // Check if email is being changed to an existing email (excluding current user)
    if (normalizedEmail !== currentEmail) {
      const existingUser = await User.findOne({ 
        email: normalizedEmail,
        _id: { $ne: req.user._id }
      });
      if (existingUser) {
        return res.status(409).json({ message: 'Email is already in use.' });
      }
    }

    // Update user fields
    req.user.name = name.trim();
    req.user.email = normalizedEmail;
    req.user.phone = phone?.trim() || '';
    
    await req.user.save();

    const { status, role } = req.user;
    return res.json({ 
      user: { 
        name: req.user.name, 
        email: req.user.email, 
        phone: req.user.phone, 
        status, 
        role 
      } 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to update profile.' });
  }
});

module.exports = router;
