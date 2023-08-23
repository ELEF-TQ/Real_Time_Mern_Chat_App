const express = require('express');
const { AuthProtect } = require('../middlewares/authMiddleware');
const router = express.Router();
const {sendMessage , getAllMessages } = require('../controllers/messController');

router.post('/' ,  AuthProtect , sendMessage)
router.get('/:chatId' ,  AuthProtect , getAllMessages)



module.exports = router;