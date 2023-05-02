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
  if (existingCategory) return res.status(400).send("Category already exists");

  const newCategory = await Category.create({name});
  return res.status(201).json(newCategory);
});

router.get("/:id/items", async function (req, res) {
  const categoryId = req.params.id;
  try {
    const category = await Category.findById(categoryId);
    const menuItems = await MenuItemCategory.find({category: category.id}).populate("menuItem");

    return res.status(200).json({...category._doc, menuItems: menuItems.map(e => e.menuItem)});
  } catch {
    res.status(400).json({error: "There is no such identity."});
  }
});
module.exports = router;
