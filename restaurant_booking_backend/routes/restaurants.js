// GET /restaurants - δημόσιο endpoint
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/restaurants', async (req, res) => {
  try {
    const [restaurants] = await db.query('SELECT * FROM restaurants');
    res.json(restaurants);
  } catch (err) {
    console.error('Error fetching restaurants:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
