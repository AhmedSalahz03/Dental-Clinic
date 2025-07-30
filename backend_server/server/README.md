# Patient Module – Dental Office Backend

## Entity Chosen: Patient
The Patient entity was chosen because it is central to any dental clinic management system. It stores all relevant patient information, medical history, and dental chart data, which are essential for clinic operations and future extensions (appointments, treatments, billing, etc).

## Model Fields
The Patient model includes:
- `name`: Patient's full name
- `email`: Unique email address
- `profilePic`: Profile picture URL
- `gender`: Gender (male, female, other)
- `dateOfBirth`: Date of birth
- `address`: Country, city, zip, street
- `phone`: Unique phone number
- `medicalHistory`: Allergies, medications, conditions, notes
- `dentalChart`: Map of teeth with condition and notes
- `createdAt`: Date of record creation

## Routes Summary
All routes are prefixed with `/api/patients`:

| Method | Endpoint              | Description                |
|--------|-----------------------|----------------------------|
| POST   | `/api/patients`       | Create a new patient       |
| GET    | `/api/patients`       | Get all patients           |
| GET    | `/api/patients/:id`   | Get patient by ID          |
| PATCH  | `/api/patients/:id`   | Update patient by ID       |
| DELETE | `/api/patients/:id`   | Delete patient by ID       |

## How to Run Locally
1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your `.env` file with your MongoDB URI:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the server:
   ```
   npm run dev
   ```
5. Use Postman to test the endpoints above. Example requests and responses are available in the repo screenshots folder.

## Notes
- Built with Node.js, Express, and Mongoose.
- All controllers use async/await and proper error handling.
- Express JSON middleware is enabled.
- This module is ready for future extension (users, authentication, role-based access, etc).

---
**Author:** Ahmed Salah
**Project:** Dental Office Backend
