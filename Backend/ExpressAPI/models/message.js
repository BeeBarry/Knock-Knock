// models/Message.js
const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true
  },
  username: { type: String, required: true },
  text:     { type: String, required: true },
  timestamp:{
    type:     Date,
    default:  Date.now,
    immutable:true
  }
}, { collection: "Messages" });

module.exports = mongoose.model("Message", messageSchema);
