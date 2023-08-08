const asyncHandler = require('express-async-handler');
const CHAT = require('../models/chatModel');
const USER = require('../models/userModel');

const AccessChat = asyncHandler(async(req,res)=> {
    const {userId} = req.body;
    if(!userId){
        return res.sendStatus(400);
    }

    var isChat = await CHAT.find({
        isGroupChat:false,
        $and : [
            { users : {$elemMatch :{$eq : req.user._id}}},
            { users : {$elemMatch :{$eq : userId}}},
        ]
    }).populate("users" , "-password")
      .populate("latestMessage");


      isChat = await USER.populate(isChat , {
        path: 'latestMessage.sender',
        select: "name pic email", 
      });

     if (isChat.length > 0) {
        res.json(isChat[0]); // Send the chat object as JSON
      } else {
        var chatData = {
          chatName: "sender",
          isGroupChat: false,
          users: [req.user._id, userId],
        };
        try {
          const createdChat = await CHAT.create(chatData);
          const FullChat = await CHAT.findOne({_id: createdChat._id}).populate(
            "users",
            "-password"
          );
          res.status(200).json(FullChat); // Send the chat object as JSON
        } catch (error) {
          res.status(400);
          throw new Error(error.message);
        }
      }
});

const GetChats = asyncHandler(async(req,res)=> {
    try {
        CHAT.find({users:{$elemMatch : {$eq : req.user._id}}})
          .populate("users", "-password")
          .populate("groupAdmin","-password")
          .populate("latestMessage")
          .sort({updatedAt:-1})
          .then(async (resaults)=> {
            resaults = await USER.populate(resaults , {
                path: "latestMessage.sender",
                select: "name pic email",
            });
            res.status(200).send(resaults);
          })
    }catch (error) {
        throw new Error(error.message)
    }
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




