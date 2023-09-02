const asyncHandler = require('express-async-handler');
const CHAT = require('../models/chatModel');
const USER = require('../models/userModel');
const MESSAGE = require('../models/messageModel');

// Send Message
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  try {
    if (!chatId || !content) {
      console.log("Invalid data");
      return res.status(400).json({ message: "Invalid data" });
    }

    // Create a new message
    const newMessage = await MESSAGE.create({
      sender: req.user._id,
      content: content,
      chat: chatId,
    });

    // Populate related fields in a single call
    const message = await MESSAGE.findById(newMessage._id)
    .populate("sender", "name pic")
    .populate("chat")
    .populate("chat.users", "name pic email")
    .exec();
  
    // Update the latestMessage in the chat
    await CHAT.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get All Messages
const getAllMessages = async (req, res, next) => {
  try {
    console.log(req.params.chatId);
    const messages = await MESSAGE.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    if (messages.length === 0) {
      return res.status(200).json({ message: "No messages found for this chat" });
    }

    res.json(messages);
    console.log(messages);
  } catch (error) {
    next(error);
  }
};

module.exports = { sendMessage, getAllMessages };
