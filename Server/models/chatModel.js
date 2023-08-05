const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
  chatName: String,
  isGroupChat: { type: Boolean, default: false },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "USER" }],
  latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "MESSAGE" },
  groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "USER" },
}, { timestamps: true });

const Chat = mongoose.model('CHAT', chatSchema);

module.exports = Chat;
