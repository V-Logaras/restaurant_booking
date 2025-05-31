import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const fetchReservations = async () => {
    if (!token) {
      setError('You must be logged in to view reservations.');
      return;
    }

    try {
      const res = await axios.get('http://localhost:3000/api/user/reservations', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReservations(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load reservations.');
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) return;

    try {
      await axios.delete(`http://localhost:3000/api/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Αφαίρεσε τη διαγραμμένη κράτηση από την κατάσταση
      setReservations((prev) => prev.filter(r => r.reservation_id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to cancel reservation.');
    }
  };

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h2>My Reservations</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <ul>
          {reservations.map((r) => (
            <li key={r.reservation_id}>
              <p><strong>Restaurant ID:</strong> {r.restaurant_id}</p>
              <p><strong>Date:</strong> {r.reservation_date}</p>
              <p><strong>Time:</strong> {r.reservation_time}</p>
              <p><strong>People:</strong> {r.people_count}</p>
              <button onClick={() => handleCancel(r.reservation_id)}>Cancel</button>
              <button onClick={() => navigate(`/edit-reservation/${r.reservation_id}`)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyReservations;
