const express = require("express");
const router = express.Router();

const Category = require("../models/CategoryModel");

router.post("/", async function (req, res, next) {
  const category = await Category.create(req.body);
  return res.send("sonsuz döngü oluyor");
});
module.exports = router;
