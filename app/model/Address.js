const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    houseno: { type: String, required: true },
    district: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: Number, required: true },
    landmark: { type: String },
    state: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
