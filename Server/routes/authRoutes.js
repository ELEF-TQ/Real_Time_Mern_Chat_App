const express = require('express');
const router = express.Router();
const {SignIn , SignUp , GuestUserCredentials} = require('../controllers/authController');


router.post('/signin',SignIn);
router.post('/signup',SignUp);
router.get('/guest',GuestUserCredentials);


module.exports = router;