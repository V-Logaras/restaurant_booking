import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditReservation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/user/reservations', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const r = res.data.find(res => res.reservation_id == id);
        if (!r) {
          setError('Reservation not found');
        } else {
          setReservation(r);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch reservation');
      }
    };

    fetchData();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/reservations/${id}`, {
        reservation_date: reservation.reservation_date,
        reservation_time: reservation.reservation_time,
        people_count: reservation.people_count
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Reservation updated successfully!');
      navigate('/my-reservations');
    } catch (err) {
      console.error(err);
      setError('Update failed');
    }
  };

  const handleChange = (e) => {
    setReservation({
      ...reservation,
      [e.target.name]: e.target.value
    });
  };

  if (!reservation) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h2>Edit Reservation</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Date:</label><br />
        <input type="date" name="reservation_date" value={reservation.reservation_date} onChange={handleChange} /><br /><br />
        
        <label>Time:</label><br />
        <input type="time" name="reservation_time" value={reservation.reservation_time} onChange={handleChange} /><br /><br />
        
        <label>People:</label><br />
        <input type="number" name="people_count" value={reservation.people_count} min="1" onChange={handleChange} /><br /><br />
        
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditReservation;
