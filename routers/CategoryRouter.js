const express = require("express");
const router = express.Router();

const Category = require("../models/CategoryModel");

router.get("/", async function (req, res, next) {
  const category = await Category.create({
    name: "Yoresel"
  });
});
module.exports = router;
