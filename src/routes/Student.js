const express = require('express');
const router =  express.Router();
const {AddStudent,GetAllStudents,EditStudent} = require('../controllers/StudentController')
const path = require('path');


router.post('/' , AddStudent);
router.get('/', GetAllStudents)
router.post('/edit',EditStudent )

module.exports = router