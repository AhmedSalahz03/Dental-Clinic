const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Example route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Patient routes
const patientRoutes = require('./routes/patientRoutes');
app.use('/api/patients', patientRoutes);

// Admin routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

// Appointment routes
const appointmentRoutes = require('./routes/appointmentRoutes')
app.use('/api/appointments', appointmentRoutes);

// Payment routes
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payments', paymentRoutes);

module.exports = app;
