const mongoose = require("mongoose");

const messages = new mongoose.Schema({
  name: String,
  uid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  uav: String,
  text: String,
  sent: { type: Date, default: Date.now },
});

module.exports = mongoose.model("message", messages);
