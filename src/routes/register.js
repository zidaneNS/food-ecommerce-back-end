const express = require('express');
const router = express.Router();
const handleRegister = require('../controllers/registerController');

router.route('/').post(handleRegister);

module.exports = router;