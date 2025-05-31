import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/restaurants');
        setRestaurants(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load restaurants');
      }
    };

    fetchRestaurants();
  }, []);

  const handleBook = (id) => {
    if (!token) {
      alert('Please login first to make a reservation.');
      navigate('/login');
    } else {
      navigate(`/reserve/${id}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Available Restaurants</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <ul>
          {restaurants.map((r) => (
            <li key={r.restaurant_id}>
              <h3>{r.name}</h3>
              <p>{r.location}</p>
              <p>{r.description}</p>
              {token && (
                <button onClick={() => handleBook(r.restaurant_id)}>
                  Book Now
                </button>
              )}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
