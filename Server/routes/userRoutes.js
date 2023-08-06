const express = require('express');
const router = express.Router();
const {SignIn , SignUp , GuestUserCredentials} = require('../controllers/userController');


router.post('/signin',SignIn);
router.post('/signup',SignUp);
router.get("/guest",GuestUserCredentials);
router.get('/',(req,res) => {
    res.send('Welcome');
});


module.exports = router;