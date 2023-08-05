const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  content: { type: String, trim: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'USER' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'USER' },
  chat: { type: mongoose.Schema.Types.ObjectId, ref: 'CHAT' },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('MESSAGE', messageSchema);

module.exports = Message;
