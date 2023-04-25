const express = require("express");
const router = express.Router();

const Category = require("../models/CategoryModel");

router.get("/", async function (req, res) {
  const category = await Category.find();
  return res.status(200).json(category);
});

router.post("/", async (req, res) => {
  const name = req.body.name;

  const existingCategory = await Category.findOne({name});
  if (existingCategory) {
    return res.status(400).send("Category already exists");
  }

  const newCategory = new Category({name});
  await newCategory.save();

  return res.status(201).json(newCategory);
});

module.exports = router;
