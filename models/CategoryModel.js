const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Auth' 
    }
  },
  {timestamps: true}
);
module.exports = mongoose.model("Category", CategorySchema);
