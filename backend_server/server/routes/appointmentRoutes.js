const express = require('express');

const appointmentController = require('../controllers/appointmentController');

const router = express.Router();


router.get('/', appointmentController.getAllAppointments);
router.post('/', appointmentController.addAppointment);
router.get('/:id', appointmentController.getAppointmentById);
router.patch('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;