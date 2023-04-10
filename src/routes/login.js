const express = require('express');
const router = express.Router();
const path = require('path');
const {UserLogin}= require('../controllers/AuthController')


router.post('/', UserLogin);


module.exports = router;