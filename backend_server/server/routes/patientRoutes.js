const express = require('express');

const patientController = require('../controllers/patientController');

const router = express.Router();

router.get('/', patientController.getAllPatients);
router.post('/', patientController.addPatient);

module.exports = router;