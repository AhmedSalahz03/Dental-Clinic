const Payment = require('../models/Payment');

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('patient', 'name phone');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments', error });
  }
};

const getPaymentById = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findById(id).populate('patient', 'name phone');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment', error });
  }
};

const addPayment = async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: 'Error adding payment', error });
  }
};

const updatePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(400).json({ message: 'Error updating payment', error });
  }
};

const deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Payment.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payment', error });
  }
};

module.exports = {
  getAllPayments,
  getPaymentById,
  addPayment,
  updatePayment,
  deletePayment
};
