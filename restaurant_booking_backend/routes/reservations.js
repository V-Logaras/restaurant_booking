const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyToken = require('../middleware/verifyToken');

// Δημιουργία νέας κράτησης
router.post('/reservations', verifyToken, async (req, res) => {
  const user_id = req.user.user_id;
  const { restaurant_id, reservation_date, reservation_time, people_count } = req.body;

  if (!restaurant_id || !reservation_date || !reservation_time || !people_count) {
    return res.status(400).json({ message: 'Missing reservation fields' });
  }

  try {
    await db.query(
      'INSERT INTO reservations (user_id, restaurant_id, reservation_date, reservation_time, people_count) VALUES (?, ?, ?, ?, ?)',
      [user_id, restaurant_id, reservation_date, reservation_time, people_count]
    );

    res.status(201).json({ message: 'Reservation created successfully' });
  } catch (err) {
    console.error('Reservation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

//Διαγραφή κράτησης
router.delete('/reservations/:id', verifyToken, async (req, res) => {
  const reservationId = req.params.id;
  const userId = req.user.user_id;

  try {
    // Έλεγχος αν η κράτηση ανήκει στον χρήστη
    const [result] = await db.query(
      'SELECT * FROM reservations WHERE reservation_id = ? AND user_id = ?',
      [reservationId, userId]
    );

    if (result.length === 0) {
      return res.status(403).json({ message: 'Unauthorized or reservation not found' });
    }

    // Διαγραφή κράτησης
    await db.query('DELETE FROM reservations WHERE reservation_id = ?', [reservationId]);

    res.json({ message: 'Reservation deleted successfully' });
  } catch (err) {
    console.error('Error deleting reservation:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

//Μετατροπή κράτησης
router.put('/reservations/:id', verifyToken, async (req, res) => {
  const reservationId = req.params.id;
  const userId = req.user.user_id;
  const { reservation_date, reservation_time, people_count } = req.body;

  try {
    // Έλεγχος αν η κράτηση ανήκει στον χρήστη
    const [result] = await db.query(
      'SELECT * FROM reservations WHERE reservation_id = ? AND user_id = ?',
      [reservationId, userId]
    );

    if (result.length === 0) {
      return res.status(403).json({ message: 'Unauthorized or reservation not found' });
    }

    // Ενημέρωση κράτησης
    await db.query(
      'UPDATE reservations SET reservation_date = ?, reservation_time = ?, people_count = ? WHERE reservation_id = ?',
      [reservation_date, reservation_time, people_count, reservationId]
    );

    res.json({ message: 'Reservation updated successfully' });
  } catch (err) {
    console.error('Error updating reservation:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
