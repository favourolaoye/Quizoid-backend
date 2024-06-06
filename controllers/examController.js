const Exam = require('../models/Exam');

exports.createExam = async (req, res) => {
  const { title, description, startTime, endTime, questions } = req.body;

  try {
    const exam = new Exam({
      title,
      description,
      startTime,
      endTime,
      questions
    });

    await exam.save();
    res.status(201).json({ msg: 'Exam created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
