const express = require('express');

const patientController = require('../controllers/patientController');

const router = express.Router();


router.get('/', patientController.getAllPatients);
router.post('/', patientController.addPatient);
router.get('/:id', patientController.getPatientById);
router.patch('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

module.exports = router;