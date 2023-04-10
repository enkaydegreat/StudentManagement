const express = require('express');
const router = express.Router();
const {AddNewUser} = require('../controllers/AuthController')


router.post('/', AddNewUser)

module.exports = router;