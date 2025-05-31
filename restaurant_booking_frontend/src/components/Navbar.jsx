import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
        <div className="navbar-left">
            <Link to="/">Home</Link>
        </div>
        <div className="navbar-right">
            {!token ? (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            ) : (
                <>
                    <Link to="/my-reservations">My Reservations</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </div>
    </nav>

  );
}

export default Navbar;
