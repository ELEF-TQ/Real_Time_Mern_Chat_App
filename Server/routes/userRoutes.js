const express = require('express');
const router = express.Router();
const {getAllUsers} = require('../controllers/userController');
const {AuthProtect} = require('../middlewares/authMiddleware');


router.get('/', AuthProtect , getAllUsers)

module.exports = router;