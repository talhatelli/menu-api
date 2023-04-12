const mongoose = require("mongoose");

const PriceHistory = new mongoose.Schema(
  {
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem"
    },
    price: {
      type: Number,
      required: true
    }
  },
  {timestamps: true}
);
module.exports = mongoose.model("PriceHistory", PriceHistory);
