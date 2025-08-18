const AdminUser = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Admin signup
const signup = async (req, res) => {
  const { username, password, secret, secret_code, role, roles } = req.body;

  const providedSecret = typeof secret_code !== 'undefined' ? secret_code : secret;
  const providedRoles = Array.isArray(roles)
    ? roles
    : (typeof role === 'string' && role.trim() !== '')
      ? [role]
      : [];

  if (!username || !password || !providedSecret || providedRoles.length === 0) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Secret code check
  if (providedSecret !== process.env.SIGNUP_SECRET_CODE) {
    return res.status(403).json({ message: 'Invalid signup code' });
  }

  try {
    const existingUser = await AdminUser.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already registered' });
    }

    const newUser = await AdminUser.create({ username, password, roles: providedRoles });

    const token = jwt.sign({ id: newUser._id, roles: newUser.roles }, process.env.JWT_SECRET, {
      expiresIn: '3d',
    });

    res.status(201).json({
      message: 'Signup successful',
      user: { id: newUser._id, username: newUser.username, roles: newUser.roles },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Signup error', error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Username and password required' });

  try {
    const user = await AdminUser.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, roles: user.roles || [] }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, username: user.username, roles: user.roles || [] },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Login error', error });
  }
};

module.exports = {
  signup,
  login
};