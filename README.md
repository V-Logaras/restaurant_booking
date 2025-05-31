<<<<<<< HEAD

# Restaurant Booking App

A full-stack web application that allows users to book tables at restaurants. Built using React (frontend) and Node.js (backend) with a MySQL-compatible database.

---

## 📁 Project Structure

```
restaurant_booking/
├── backend/        # Node.js + Express API
├── frontend/       # React.js frontend (Vite)
└── README.md       # Full documentation (you are here)
```

---

## 🧠 Features

### 👤 Users can:
- Register & log in (JWT)
- Browse restaurants
- Book tables by date, time, and people
- View, edit, and cancel their reservations

### 🔐 Security:
- JWT-based protected routes
- Password hashing with bcrypt
- Authenticated users can only modify their own reservations

---

## 🛠️ Technologies Used

| Layer     | Stack                             |
|-----------|------------------------------------|
| Frontend  | React + Vite + Axios + React Router |
| Backend   | Node.js + Express.js + JWT + bcrypt |
| Database  | MariaDB / MySQL                   |
| Styling   | Custom CSS                        |
| Testing   | Postman                           |

---

## 🚀 Getting Started

### ✅ 1. Clone and navigate

```bash
git clone https://github.com/V-Logaras/restaurant_booking.git
cd restaurant_booking
```

### ▶️ 2. Setup and run Backend

```bash
cd backend
npm install
nodemon server.js
```

Set up your `.env` file:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=1234
DB_NAME=restaurant_booking_db
DB_PORT=3306
JWT_SECRET=your_jwt_secret
```

Create the database using the `restaurant_booking_db.sql` script.

---

### 🌐 3. Setup and run Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Access at: [http://localhost:5173]

---

## 🔗 API Overview

### Auth Routes
- `POST /api/auth/register`
- `POST /api/auth/login`

### Restaurant Routes
- `GET /api/restaurants`

### Reservation Routes (JWT-protected)
- `POST /api/reservations`
- `GET /api/user/reservations`
- `PUT /api/reservations/:id`
- `DELETE /api/reservations/:id`

---
=======
# restaurant_booking
A full-stack web app for restaurant table reservations using React and Node.js
>>>>>>> 3880af1f9645fe3c84bad403fa333f5aad6ed278
