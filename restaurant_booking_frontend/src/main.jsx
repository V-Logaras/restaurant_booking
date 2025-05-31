import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './pages/App';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Reserve from './pages/Reserve';
import MyReservations from './pages/MyReservations';
import EditReservation from './pages/EditReservation';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reserve/:restaurantId" element={<Reserve />} />
      <Route path="/my-reservations" element={<MyReservations />} />
      <Route path="/edit-reservation/:id" element={<EditReservation />} />
    </Routes>
  </BrowserRouter>
);
