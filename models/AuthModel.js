const mongoose = require("mongoose");


const AuthModelShecma = new mongoose.Schema(
  {
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
      menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }]
  },
  {timestamps: true}
);
module.exports = mongoose.model("Auth", AuthModelShecma);