const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  
  },
  messages: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    }
  ]
});

const Message = mongoose.model("Message", MessageSchema,'messages');

module.exports = Message;
