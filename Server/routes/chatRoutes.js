const express = require('express');
const { AuthProtect } = require('../middlewares/authMiddleware');
const router = express.Router();
const {AccessChat , GetChats , CreateGroup , RenameGroup , RemoveFromGroup , AddToGroup} = require('../controllers/chatController');

router.post('/', AuthProtect , AccessChat);
router.get('/', AuthProtect , GetChats );
router.post('/group',AuthProtect , CreateGroup);
router.put('/rename',AuthProtect , RenameGroup);
router.put('/remove',AuthProtect , RemoveFromGroup);
router.post('/add',AuthProtect , AddToGroup);


module.exports = router;