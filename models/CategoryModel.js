const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  localFoods: {
    type: String,
    required: true,
    trim: true
  },
  meats: {
    type: String,
    required: true,
    trim: true
  },
  pastas: {
    type: String,
    required: true,
    trim: true
  },
  desserts: {
    type: String,
    required: true,
    trim: true
  },
  hotDrinks: {
    type: String,
    required: true,
    trim: true
  },
  coldDrinks: {
    type: String,
    required: true,
    trim: true
  }
});
module.exports = mongoose.model("Category", CategorySchema);
