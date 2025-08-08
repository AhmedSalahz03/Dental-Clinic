# Authentication Module – Dental Office Backend

## What This Module Does
This module provides authentication for the Dental Office backend. It allows admins to sign up and log in securely, using hashed passwords and JWT tokens. Protected routes are available for authenticated users only.

## User Roles
- **Admin**

## Model Fields
The Admin model includes:
- `username`: Unique username
- `password`: Hashed password
- `role`: User role (e.g., admin, dentist)

## Routes List & Examples

| Method | Endpoint              | Description                       |
|--------|-----------------------|-----------------------------------|
| POST   | `/api/admin/signup`   | Register a new admin, returns JWT |
| POST   | `/api/admin/login`    | Login, returns JWT                |
| GET    | `/api/appointments`   | Example protected route           |

### Example Signup Request
```json
{
  "username": "ahmedsalah",
  "password": "somepassword",
  "secret": "theactualsecret",
  "role": "dentist"
}
```

### Example Login Request
```json
{
  "username": "ahmedsalah",
  "password": "somepassword"
}
```

### Using the Token
- After signup/login, copy the returned token.
- For protected routes, add this header in Postman:
  ```
  Authorization: Bearer <your_token_here>
  ```

## How to Run Locally

1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your `.env` file with these three required values:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   SIGNUP_SECRET_CODE=theactualsecret
   ```

**.env Value Explanations:**
- `PORT`: The port your server will run on (default is 5000).
- `MONGODB_URI`: Your MongoDB connection string.
- `JWT_SECRET`: Used to sign and verify JWT tokens for authentication.
- `SIGNUP_SECRET_CODE`: A private code required for admin signup. This ensures only authorized staff (not the public) can create admin accounts on the system. This code will only be shared with clinic staff.

4. Start the server:
   ```
   npm run dev
   ```
5. Use Postman to test the endpoints above.

## Notes
- Passwords are hashed with bcryptjs.
- JWT tokens are used for authentication.
- Modular code structure (models, controllers, routes, middleware).
- Ready for future extension (user photos, role-based access, etc).

---
**Author:** Ahmed Salah  
**Project:** Dental Office Backend
