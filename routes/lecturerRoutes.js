
const express = require('express');

const {addLecturer} = require("../controllers/lecturerController");

const router = express.Router();

router.post('/add', addLecturer);

module.exports = router;
