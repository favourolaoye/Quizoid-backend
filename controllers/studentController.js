const Student = require('../models/Student');

exports.registerStudent = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ msg: 'Student already exists' });
    }

    student = new Student({
      name,
      email,
      password
    });

    await student.save();
    res.status(201).json({ msg: 'Student registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
