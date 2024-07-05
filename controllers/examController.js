// const Exam = require('../models/Exam');

// exports.createExam = async (req, res) => {
//   const { title, description, startTime, endTime, questions } = req.body;

//   try {
//     const exam = new Exam({
//       title,
//       description,
//       startTime,
//       endTime,
//       questions
//     });

//     await exam.save();
//     res.status(201).json({ msg: 'Exam created successfully' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };


// controllers/examController.js
const Exam = require('../models/Exam');

const createExam = async (req, res) => {
  const { code, title, examType, questions, lecturerID } = req.body;
  
  try {
    const newExam = new Exam({
      code,
      title,
      examType,
      questions,
      units,
      lecturerID
    });

    await newExam.save();
    res.status(201).json({ message: 'Exam created successfully', exam: newExam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getExamsByCourse = async (req, res) => {
  const { courseCode } = req.params;
  
  try {
    const exams = await Exam.find({ courseCode });
    res.status(200).json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getExamsByLecturerID = async (req, res) => {
  const { lecturerID } = req.params;
  
  try {
    const exams = await Exam.find({ lecturerID });
    res.status(200).json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getExamById = async (req, res) => {
  const { id } = req.params;

  try {
    const exam = await Exam.findById(id);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    res.status(200).json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateExam = async (req, res) => {
  const { id } = req.params;
  const { title, questions } = req.body;

  try {
    const updatedExam = await Exam.findByIdAndUpdate(id, { title, questions }, { new: true });
    if (!updatedExam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    res.status(200).json({ message: 'Exam updated successfully', exam: updatedExam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// const deleteExam = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedExam = await Exam.findByIdAndDelete(id);
//     if (!deletedExam) {
//       return res.status(404).json({ message: 'Exam not found' });
//     }
//     res.status(200).json({ message: 'Exam deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

const deleteExam = async (req, res) => {
  const { code } = req.params;
  
  try {
    const exam = await Exam.findOne({ code });
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { createExam, getExamsByCourse, getExamById, updateExam, deleteExam, getExamsByLecturerID };
