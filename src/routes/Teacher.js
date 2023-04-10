const express = require('express');
const router = express.Router();
const {GetTeachers,AddTeacher,EditTeacher} = require('../controllers/TeacherController')


router.get('/' , GetTeachers)
router.post('/', AddTeacher)
router.post('/edit', EditTeacher)



module.exports = router;