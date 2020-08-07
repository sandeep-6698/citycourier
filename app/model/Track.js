const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    courier_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Couriers",
      required: true,
    },
    takeFrom: { type: Boolean, default: false },
    deliverTo: { type: Boolean, default: false },
    status: { type: String, default: "Pending" },
    messages: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Track", trackSchema);
