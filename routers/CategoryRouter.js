const express = require("express");
const router = express.Router();

const Category = require("../models/CategoryModel");

router.get("/categories", async function (req, res, next) {
  const category = await Category.create(req.body);
  return res.status(200).json(category);
});
module.exports = router;
