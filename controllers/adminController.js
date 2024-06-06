const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET_ID;

exports.registerAdmin = async (req, res) => {
  const { adminID, name, password } = req.body;

  console.log({ adminID, name, password });

  if (!adminID || !name || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    let admin = await Admin.findOne({ adminID });

    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    else {
      // Hash the password before saving it
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      admin = new Admin({
        adminID,
        name,
        password: hashedPassword
      });

      await admin.save();

      const payload = {
        admin: {
          id: admin.id,
        },
      };

      jwt.sign(
        payload,
        secret,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    }
  } catch (err) {
    console.log(err.message);
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

//login handler function

exports.loginAdmin = async (req, res) => {
  const { adminID, password } = req.body;
  console.log({ adminID, password });

  try {
    let admin = await Admin.findOne({ adminID });

    //check if user defined ID matches any existing data in db
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    //hash user defined password and compare with one in db
    const isMatch = await bcrypt.compare(password, admin.password);
    //if password did'nt match do this
    if (!isMatch) {
      return res.status(400).json({ message: 'wrong password' });
    }

    const payload = {
      admin: {
        id: admin.id,
      },
    };

    jwt.sign(
      payload,
      secret,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
