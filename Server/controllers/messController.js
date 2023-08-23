const asyncHandler = require('express-async-handler');
const CHAT = require('../models/chatModel');
const USER = require('../models/userModel');
const MESSAGE =  require('../models/messageModel');

//_________ SendMessage : 
const sendMessage = asyncHandler(async(req,res)=> { 
    const { content , chatId } = req.body;
  
    if(!chatId || !content){
        console.log("invalid data");
        return res.sendStatus(404);
    }

    var newMessage = {
        sender : req.user._id ,
        content : content ,
        chatId : chatId ,
    }

    try {
        var message = await MESSAGE.create(newMessage);
        message = await message.populate("sender" , "name pic");
        message = await message.populate("chat");
        message = await USER.populate(message , {
            path : 'chat.users',
            select : "name pic email",
        })

        await CHAT.findByIdAndUpdate(req.body.chatId , {
            latestMessage : message,
        })

        res.json(message);
        
    } catch (error) {
        res.status(400);
        throw new Error(error.message);    
    }

});

//_________ getAllMessages : 
const getAllMessages = asyncHandler(async(req,res)=> { 
    try {
        const messages = await MESSAGE.find({chat : req.params.chatId })
        .populate( "sender" , "name pic email").populate("chat");
        res.json(messages);
        

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
        
    }

});


module.exports ={sendMessage,getAllMessages}