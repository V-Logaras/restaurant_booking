import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Reserve() {
  const { restaurantId } = useParams();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('token');

    if (!token) {
      setError('You must be logged in to reserve.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/reservations', {
        restaurant_id: restaurantId,
        reservation_date: date,
        reservation_time: time,
        people_count: people
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Reservation created!');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Reservation failed. Please try again.');
    }
  };

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h2>Reserve a table</h2>
      <form onSubmit={handleSubmit}>
        <label>Date:</label><br />
        <input type="date" value={date} required onChange={(e) => setDate(e.target.value)} /><br /><br />

        <label>Time:</label><br />
        <input type="time" value={time} required onChange={(e) => setTime(e.target.value)} /><br /><br />

        <label>People:</label><br />
        <input type="number" min="1" value={people} required onChange={(e) => setPeople(e.target.value)} /><br /><br />

        <button type="submit">Confirm Reservation</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Reserve;
