// models/User.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true }
}, {
  collection: "Profiles"
});

module.exports = mongoose.model("User", userSchema);
