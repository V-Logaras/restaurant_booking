-- Δημιουργία βάσης δεδομένων
CREATE DATABASE IF NOT EXISTS restaurant_booking_db;
USE restaurant_booking_db;

-- Πίνακας χρηστών
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Πίνακας εστιατορίων
CREATE TABLE IF NOT EXISTS restaurants (
    restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    description TEXT
);

-- Πίνακας κρατήσεων
CREATE TABLE IF NOT EXISTS reservations (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    people_count INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id) ON DELETE CASCADE
);

-- Εισαγωγή παραδειγματικών εστιατορίων
INSERT INTO restaurants (name, location, description) VALUES
('Pizza Place', 'Athens', 'Casual Italian dining'),
('Sushi World', 'Thessaloniki', 'Authentic Japanese cuisine');
