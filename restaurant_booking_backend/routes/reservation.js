const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyToken = require('../middleware/verifyToken');

// Προστατευμένο endpoint για προβολή κρατήσεων χρήστη
router.get('/user/reservations', verifyToken, async (req, res) => {
  const userId = req.user.user_id;

  try {
    const [reservations] = await db.query(
      'SELECT * FROM reservations WHERE user_id = ?',
      [userId]
    );
    res.json(reservations);
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
