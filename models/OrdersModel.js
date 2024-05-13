const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: String
    },
    note: {
      type: String
    },
    count: {
      type: Number
    },
    status: {
      type: String,
      default: "pending"
    }
  },
  {timestamps: true}
);
module.exports = mongoose.model("Orders", OrdersSchema);
