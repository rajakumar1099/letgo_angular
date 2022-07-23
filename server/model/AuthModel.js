const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  registerTimestamp: {
    type: String,
  },
  lastLoginTimestamp: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
