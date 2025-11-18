# Dental Office Backend

## Overview
This is the backend for the Dental Office Management System. It provides RESTful APIs for managing patients, appointments, payments, and admin authentication. Built with Node.js, Express, and MongoDB (Mongoose).

## Features
- Patient management (CRUD)
- Appointment scheduling and management
- Payment tracking
- Admin authentication (signup, login, JWT-based route protection)
- Modular code structure (models, controllers, routes, middleware)

## Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Getting Started

### 1. Clone the Repository
```
git clone https://github.com/AhmedSalahz03/Dental-Clinic.git
```

### 2. Install Dependencies
```
cd Dental-Clinic/backend_server
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in `backend_server` with the following:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SIGNUP_SECRET_CODE=your_signup_secret
```
- `PORT`: Server port (default 5000)
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret for signing JWT tokens
- `SIGNUP_SECRET_CODE`: Secret code required for any signup (only staff should have this).

### 4. Run the Server
```
npm run dev
```

## API Endpoints

### Patients
- `POST /api/patients` – Create a new patient
- `GET /api/patients` – Get all patients
- `GET /api/patients/:id` – Get patient by ID
- `PATCH /api/patients/:id` – Update patient
- `DELETE /api/patients/:id` – Delete patient

### Appointments
- All appointment routes are protected (require JWT)
- `POST /api/appointments` – Create appointment
- `GET /api/appointments` – Get all appointments
- `GET /api/appointments/:id` – Get appointment by ID
- `PATCH /api/appointments/:id` – Update appointment
- `DELETE /api/appointments/:id` – Delete appointment

### Payments
- All payment routes are protected (require JWT)
- `POST /api/payments` – Add payment
- `GET /api/payments` – Get all payments
- `GET /api/payments/:id` – Get payment by ID
- `PATCH /api/payments/:id` – Update payment
- `DELETE /api/payments/:id` – Delete payment

### Admin Authentication
- `POST /api/admin/signup` – Register new admin (requires signup secret code)
- `POST /api/admin/login` – Login and get JWT token

## Example Signup Request
```json
{
  "username": "ahmedsalah",
  "password": "somepassword",
  "secret": "your_signup_secret",
  "role": "admin"
}
```

## Example Login Request
```json
{
  "username": "ahmedsalah",
  "password": "somepassword"
}
```

## Using JWT Tokens
- After signup/login, copy the returned token.
- For protected routes, add this header in Postman:
  ```
  Authorization: Bearer <your_token_here>
  ```

## Notes
- Only staff with the signup secret code can register as admins.
- Passwords are securely hashed.
- Ready for future extension (user photos, role-based access, etc).

---
**Author:** Ahmed Salah
**Repo:** [Dental-Clinic](https://github.com/AhmedSalahz03/Dental-Clinic.git)


// test date 3