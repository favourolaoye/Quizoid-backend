const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const examRoutes = require('./routes/examRoutes');
const studentRoutes = require('./routes/studentRoutes');
require('dotenv').config();


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  //
}).then(() => {
  console.log('Connected to the database');
}).catch((err) => {
  console.log('Failed to connect to the database', err);
});

// Routes
app.use('/admin', adminRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running @port: ${PORT}`);
});
