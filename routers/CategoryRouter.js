const express = require("express");
const router = express.Router();

const Category = require("../models/CategoryModel");
const MenuItem = require("../models/MenuItemModel");
const MenuItemCategory = require("../models/MenuItemCategoryModel");

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

router.get("/:id/items", async function (req, res) {
  const categoryId = await Category.findById(req.params.id).populate(MenuItem.id);
  const menuItems = await MenuItemCategory.find({category: categoryId.id}).populate("menuItem");
  return res.status(200).json({...categoryId, menuItems});
});
module.exports = router;
