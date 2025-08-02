const Appointment = require('../models/Appointment');

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patient', 'name phone');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

const getAppointmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findById(id).populate('patient', 'name phone');
    if (!appointment) {
      return res.status(404).json({ message: 'Apppointment not found' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointment', error });
  }
}

const addAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ message: 'Error adding appointment', error });
  }
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: 'Error updating appointment', error });
  }
};


const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error });
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  addAppointment
};