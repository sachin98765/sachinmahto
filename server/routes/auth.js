const express = require('express');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const { protect } = require('../middleware/auth');
const router  = express.Router();

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/register  — first-time admin setup
router.post('/register', async (req, res) => {
  try {
    const count = await User.countDocuments();
    if (count > 0 && process.env.NODE_ENV === 'production') {
      return res.status(403).json({ success: false, error: 'Registration is closed.' });
    }
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username and password are required.' });
    }
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ success: false, error: 'Username already taken.' });

    const user = await User.create({ username, password });
    res.status(201).json({ success: true, token: signToken(user._id), user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username and password are required.' });
    }
    const user = await User.findOne({ username }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid credentials.' });
    }
    res.json({ success: true, token: signToken(user._id), user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/auth/me  (protected)
router.get('/me', protect, async (req, res) => {
  res.json({ success: true, user: req.user });
});

module.exports = router;
