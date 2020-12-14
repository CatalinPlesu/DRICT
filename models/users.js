const mongoose = require("mongoose");

const users = new mongoose.Schema({
	user_naem    : String,
	unique_id    : String,
	password      : String,
	joined : { type: Date, default: Date.now }
});

module.exports = mongoose.model("user", users);
