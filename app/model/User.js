const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true, unique: true, max: 13, min: 13 },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", userSchema);
