const express = require('express');
const router = express.Router();
const Students = require('../models/studentModel');
const jwt = require('jsonwebtoken');

// Verify Email Route
router.get('/verify-email', async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) {
      return res.status(400).json({ status: 'Failed', message: 'Invalid token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Students.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ status: 'Failed', message: 'Invalid token' });
    }

    user.verified = true;
    await user.save();

    res.status(200).json({ status: 'Success', message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ status: 'Failed', message: 'Failed to verify email', error: error.message });
  }
});

module.exports = router;
