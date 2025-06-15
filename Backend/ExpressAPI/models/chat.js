// models/Chat.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",    // must match mongoose.model("User", ...)
      required: true
    }
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message"
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);
