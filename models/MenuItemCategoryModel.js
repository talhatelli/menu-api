const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuItemCategory = new Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem"
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }
});
module.exports = mongoose.model("MenuItemCategory", MenuItemCategory);
