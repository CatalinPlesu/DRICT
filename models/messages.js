const mongoose = require("mongoose");

const messages = new mongoose.Schema({
  name: String,
  id: String,
  text: String,
  sent: { type: Date, default: Date.now }
});

module.exports = mongoose.model("message", messages);
