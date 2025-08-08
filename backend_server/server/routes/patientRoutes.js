const express = require('express');

const patientController = require('../controllers/patientController');

const protect = require('../middleware/auth');

const router = express.Router();

router.use(protect); // Apply authentication middleware to all patient routes
router.get('/', patientController.getAllPatients);
router.post('/', patientController.addPatient);
router.get('/:id', patientController.getPatientById);
router.patch('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

module.exports = router;