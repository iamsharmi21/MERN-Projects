const express = require('express');
const { createSignup, Getusers } = require('../controllers/signupController');
const authorize = require('../utils');
const router = express.Router();

router.route('/signup').post(createSignup);
router.route('/getusers').get(authorize(),Getusers);

module.exports = router  