const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true,unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true, unique: true, max: 13, min: 13 },
    type: [{
      type: String,
      enum: [0,1,2,3],
  }],
    varified: { type: Date },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Staff", staffSchema);
