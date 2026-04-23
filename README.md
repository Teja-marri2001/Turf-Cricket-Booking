# Turf Cricket Booking System (MVP)

A mobile-first box cricket turf booking application with a 3-step booking flow.

## Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Spring Boot (Java 17) REST API
- Database: MySQL

## Project Structure
- `frontend/` - customer booking UI + admin panel UI
- `backend/` - booking APIs, slot management, pricing APIs

 🚀 Features

- 📅 Select date and view available slots
- ⏰ Dynamic 2-hour slot generation
- 🔒 Prevent double booking
- 💳 Checkout & booking confirmation
- 🗄 MySQL database integration

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on [http://localhost:5173](http://localhost:5173).

## Backend Setup
Update `backend/src/main/resources/application.properties` with your MySQL credentials.

```bash
cd backend
mvn spring-boot:run
```
Backend runs on [http://localhost:8080](http://localhost:8080).

## Key APIs
- `GET /api/bookings/slots?date=YYYY-MM-DD`
- `POST /api/bookings`
- `GET /api/admin/bookings`
- `POST /api/admin/blocked-slots`
- `DELETE /api/admin/blocked-slots/{date}/{time}`
- `GET /api/admin/price`
- `PUT /api/admin/price`

## Booking Flow
1. Select date and available slot
2. Enter name and phone
3. Payment step (MVP-simulated), then confirmation

## Notes
- Double booking is prevented server-side.
- Booked and blocked slots are disabled in real-time via slot availability API.
- Price is managed from admin panel and applied at booking creation.
