const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  meats: String,
  salads: String,
  soup: String,
  hotDrinks: String,
  coldDrinks: String,
  desserts: String,
});

const Book = mongoose.model("Category", CategorySchema);
module.exports = Category;