const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceHistory = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem"
  },
  price: {
    type: Number,
    required: true
  }
});
module.exports = mongoose.model("PriceHistory", PriceHistory);
