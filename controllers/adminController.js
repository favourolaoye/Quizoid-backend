const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET_ID;

// Helper function for sending error responses
const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

exports.registerAdmin = async (req, res) => {
  const { adminID, name, password } = req.body;

  if (!adminID || !name || !password) {
    return sendErrorResponse(res, 400, 'Please provide all required fields');
  }

  try {
    let admin = await Admin.findOne({ adminID });

    if (admin) {
      return sendErrorResponse(res, 400, 'Admin already exists');
    }

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin = new Admin({
      adminID,
      name,
      password: hashedPassword,
    });

    await admin.save();

    res.status(201).json({ message: 'Admin added successfully', student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.loginAdmin = async (req, res) => {
  const { adminID, password } = req.body;

  if (!adminID || !password) {
    return sendErrorResponse(res, 400, 'Please provide all required fields');
  }

  try {
    let admin = await Admin.findOne({ adminID });

    if (!admin) {
      return sendErrorResponse(res, 400, 'Invalid credentials');
    }

    // Hash user-defined password and compare with one in the DB
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return sendErrorResponse(res, 400, 'Wrong password');
    }

    const payload = {
      user: {
        id: admin._id,
        name: admin.name,
        details:{
          name: admin.name
        },
        role: 'admin',
      },
    };

    jwt.sign(payload, secret, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user:payload });
    });
  } catch (err) {
    console.error(err.message);
    sendErrorResponse(res, 500, 'Server error');
  }
};
