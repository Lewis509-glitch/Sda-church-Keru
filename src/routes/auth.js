const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const createToken = (user) => {
  return jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '7d' }
  );
};

router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password, status } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'A user with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const normalizedEmail = email.toLowerCase().trim();
    const isAdminEmail = normalizedEmail === (process.env.ADMIN_EMAIL || '').toLowerCase();

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone?.trim() || '',
      status: status === 'member' ? 'member' : 'visitor',
      role: isAdminEmail ? 'admin' : status === 'member' ? 'member' : 'visitor',
      passwordHash,
    });

    return res.status(201).json({
      token: createToken(user),
      role: user.role,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: user.status,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to sign up at this time.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!password || (!name && !email)) {
      return res.status(400).json({ message: 'Please provide name or email and password.' });
    }

    const searchQuery = email
      ? { email: email.toLowerCase().trim() }
      : { name: name.trim() };

    const user = await User.findOne(searchQuery);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    return res.json({
      token: createToken(user),
      role: user.role,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: user.status,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to login at this time.' });
  }
});

module.exports = router;
