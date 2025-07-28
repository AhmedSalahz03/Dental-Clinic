const express = require('express');
const app = express();

app.use(express.json());


// Example route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Patient routes
const patientRoutes = require('./routes/patientRoutes');
app.use('/api/patients', patientRoutes);

module.exports = app;
