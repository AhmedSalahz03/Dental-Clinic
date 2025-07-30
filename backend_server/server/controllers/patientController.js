const Patient = require('../models/Patient');

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error });
  }
};

const getPatientById = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error });
  }
}

const addPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: 'Error adding patient', error });
  }
};

const updatePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
    if (!patient) { 
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ message: 'Error updating patient', error });
  }
}

const deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findByIdAndDelete(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient', error });
  }
}

module.exports = {
  getAllPatients,
  addPatient,
  getPatientById,
  updatePatient,
  deletePatient
};