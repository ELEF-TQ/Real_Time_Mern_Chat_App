const asyncHandler = require('express-async-handler');
const CHAT = require('../models/chatModel');
const USER = require('../models/userModel');


//_________ AccessChat : 
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

//_________ GetChats : 
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

//_________ CreateGroup : 
const CreateGroup = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "All fields are required" });
  }
  
  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res.status(400).send("More than two users are required");
  }

  users.push(req.user);

  try {
    const GroupChat = await CHAT.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const FullGroupChat = await CHAT.findOne({ _id: GroupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(FullGroupChat);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


//_________ RenameGroup : 
const RenameGroup = async (req, res, next) => {
  try {
    const { chatId, chatName } = req.body;
    const updatedChat = await CHAT.findByIdAndUpdate(chatId, { chatName: chatName }, { new: true })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found" });
    } else {
      res.json(updatedChat);
    }
  } catch (error) {
    // Pass the error to the error handling middleware (asyncHandler).
    next(error);
  }
};

//_________ RemoveFromGroup : 
const RemoveFromGroup = asyncHandler(async(req,res)=> {
  const {chatId ,userId} = req.body;
  const removedUser = await CHAT.findByIdAndUpdate(chatId , {$pull : { users: userId},} , {new: true})
   .populate("users","-password")
   .populate("groupAdmin","-password")

   if(!removedUser){
    res.status(404)
    throw new Error("Chat not found")
   }else {
    res.json(removedUser)
   }
   
});

//_________ AddToGroup : 
const AddToGroup = asyncHandler(async(req,res)=> {
  const {chatId ,userId} = req.body;
  const addedUser = await CHAT.findByIdAndUpdate(chatId , {$push : { users: userId},} , {new: true})
   .populate("users","-password")
   .populate("groupAdmin","-password")

   if(!addedUser){
    res.status(404)
    throw new Error("Chat not found")
   }else {
    res.json(addedUser)
   }
});


module.exports = {
  AccessChat ,
  GetChats , 
  CreateGroup ,
  RenameGroup , 
  RemoveFromGroup ,
  AddToGroup
}




