const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express(); // <-- Δημιουργία του app πριν το χρησιμοποιήσεις

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth'); // <-- ΠΡΕΠΕΙ να είναι μετά τα dotenv/express


const reservationRoutes = require('./routes/reservations');
app.use('/api', reservationRoutes);

const userReservationRoutes = require('./routes/reservation');
app.use('/api', userReservationRoutes);

const restaurantRoutes = require('./routes/restaurants');
app.use('/api', restaurantRoutes);

app.use('/api/auth', authRoutes); // <-- Τώρα μπορεί να χρησιμοποιηθεί

app.get('/', (req, res) => {
  res.send('Restaurant Booking API is running');
});

// DB test (προαιρετικό)
const db = require('./db');
db.query('SELECT 1')
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('DB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
