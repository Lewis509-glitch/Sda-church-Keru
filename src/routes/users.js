const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ['member', 'visitor'] } })
      .select('-passwordHash')
      .sort({ createdAt: -1 });

    return res.json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to load users.' });
  }
});

router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { name, email, phone, password, status } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: 'A user with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const role = status === 'member' ? 'member' : 'visitor';

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone?.trim() || '',
      status: role,
      role,
      passwordHash,
    });

    return res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: user.status,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to create user.' });
  }
});

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Admin accounts cannot be removed here.' });
    }

    await user.deleteOne();
    return res.json({ message: 'User removed successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to remove user.' });
  }
});

module.exports = router;
