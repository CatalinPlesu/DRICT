const mongoose = require("mongoose");
const passport_local_mongoose = require("passport-local-mongoose");

const users = new mongoose.Schema({
  username: String,
  password: String,
  joined: { type: Date, default: Date.now }
});

users.plugin(passport_local_mongoose);

module.exports = mongoose.model("user", users);
