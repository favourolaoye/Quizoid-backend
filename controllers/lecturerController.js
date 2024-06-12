// controllers/lecturerController.js
const bcrypt = require("bcryptjs");
const Lecturer = require('../models/lecturer');

const addLecturer = async (req, res) => {
  const { name, lecturerID, password, department, courses } = req.body;

  try {
    // Check for existing lecturer ID
    const existingLecturer = await Lecturer.findOne({ lecturerID });
    if (existingLecturer) {
      return res.status(400).json({ message: 'Lecturer ID already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new lecturer with hashed password
    const newLecturer = new Lecturer({
      name,
      lecturerID,
      password: hashedPassword,
      department,
      courses
    });

    await newLecturer.save();

    res.status(201).json({ message: 'Lecturer added successfully', lecturer: newLecturer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { addLecturer };
