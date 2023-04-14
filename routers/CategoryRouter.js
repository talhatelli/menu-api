const express = require("express");
const router = express.Router();

const Category = require("../models/CategoryModel");

router.get("/", async function (req, res) {
  const category = await Category.find();
  return res.status(200).json(category);
});

module.exports = router;
