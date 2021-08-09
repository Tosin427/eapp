const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bitAdd: {
    type: String,
    required: true,
  },
  bitKey: {
    type: String,
    required: true,
  },
  privateKeyEth: {
    type: String,
    required: true,
  },
  walletEthAddress: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);
