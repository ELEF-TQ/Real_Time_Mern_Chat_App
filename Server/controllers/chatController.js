const asyncHandler = require('express-async-handler');
const CHAT = require('../models/chatModel');


const AccessChat = asyncHandler(async(req,res)=> {
    const {userID} = req.body;
    if(!userID){
        return res.sendStatus(400);
    }

    var isChat = await CHAT.find({
        isGroupChat:false,
        $and : [
            { users : {$elemMatch :{$eq : req.user._id}}},
            { users : {$elemMatch :{$eq : userID}}},
        ]
    }).populate("users" , "-password")
      .populate("latestMessage");


      // STOPPED IN MINUTE 20

});

const GetChats = asyncHandler(async(req,res)=> {

});

const CreateGroup = asyncHandler(async(req,res)=> {

});

const RenameGroup = asyncHandler(async(req,res)=> {

});

const RemoveFromGroup = asyncHandler(async(req,res)=> {

});

const AddToGroup = asyncHandler(async(req,res)=> {

});


module.exports = {AccessChat , GetChats , CreateGroup , RenameGroup , RemoveFromGroup , AddToGroup}




