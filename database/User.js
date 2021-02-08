const { model } = require("mongoose");

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  createdAt: String,
  email: String,
});

module.exports = mongoose.model("User", userSchema);
