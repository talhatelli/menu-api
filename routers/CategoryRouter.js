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

router.put("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const newCategoryName = req.body.name;

    const existingCategory = await Category.findOne({id: {$ne: categoryId}, name: newCategoryName});
    if (existingCategory) return res.status(400).json({error: "Category name already exists"});

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, {name: newCategoryName}, {new: true});
    if (!updatedCategory) return res.status(404).json({error: "Category not found"});

    return res.json(updatedCategory);
  } catch {
    return res.status(400).json({error: "There is no such category"});
  }
});

router.delete("/:id", async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) return res.status(404).json({error: "Category not found"});

    await MenuItemCategory.deleteMany({categoryId: categoryId});

    return res.json({message: "Category deleted successfully"});
  } catch {
    return res.status(400).json({error: "Bad request"});
  }
});

module.exports = router;
