const AdminUser = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Admin signup
const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await AdminUser.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    const user = new AdminUser({ username, email, password, role });
    await user.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering admin', error });
  }
};

// Admin login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AdminUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

module.exports = {
  signup,
  login
};