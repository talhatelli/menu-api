const mongoose = require("mongoose");

const MenuItemCategorySchema = new mongoose.Schema(
  {
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem"
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    }
  },
  {timestamps: true}
);
module.exports = mongoose.model("MenuItemCategory", MenuItemCategorySchema);
