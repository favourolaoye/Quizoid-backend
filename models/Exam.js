// models/Exam.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  questionText: { type: String, required: true },
  options: [String],
  correctAnswer: { type: String },
  type: { type: String, required: true, enum: ['theory', 'multichoice'] }
});

const examSchema = new Schema({
  courseCode: { type: String, required: true },
  instruction: { type: String, required: true },
  type: { type: String, required: true, enum: ['theory', 'multichoice'] },
  questions: [questionSchema],
  lecturerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecturer', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;
