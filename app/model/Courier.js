const mongoose = require("mongoose");

const courierSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    weight: { type: Number, required: true },
    itemHeight: { type: Number, required: true },
    itemWidth: { type: Number, required: true },
    from: {},
    to: {
      name:{ type: String, required: true },
      mobile:{ type: String, required: true, max: 13, min: 10 },
      address:{ type: String, required: true }
    },
    fast_deliver: { type: Boolean, default: false }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Courier", courierSchema);
