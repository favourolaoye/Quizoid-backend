// const express = require('express');
// const router = express.Router();
// const examController = require('../controllers/examController');

// router.post('/create', examController.createExam);

// module.exports = router;


// routes/examRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createExam, getExamsByCourse, getExamsByLecturerID, getExamById, updateExam, deleteExam, checkExam } = require('../controllers/examController');

// Create a new exam
router.post('/', auth, createExam);

// Get all exams by course code
router.get('/course/:courseCode', auth, getExamsByCourse);

// Get all exams by LecturerID
router.get('/lecturer/:lecturerID', auth, getExamsByLecturerID);

// Get exam by ID
router.get('/:id', auth, getExamById);

// Update exam
router.put('/:id', auth, updateExam);

// Delete exam
router.delete('/code/:code', auth, deleteExam); // Corrected endpoint

// Check exam existence
router.get('/check/:code', auth, checkExam);

module.exports = router;
