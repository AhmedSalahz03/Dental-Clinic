const express = require('express');

const appointmentController = require('../controllers/appointmentController');

const protect = require('../middleware/auth');

const router = express.Router();

router.use(protect); // Apply authentication middleware to all appointment routes
router.get('/', appointmentController.getAllAppointments);
router.post('/', appointmentController.addAppointment);
router.get('/:id', appointmentController.getAppointmentById);
router.patch('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;