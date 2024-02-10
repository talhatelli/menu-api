const express = require("express");
const router = express.Router();

const Category = require("../models/CategoryModel");
const MenuItem = require("../models/MenuItemModel");
const MenuItemCategory = require("../models/MenuItemCategoryModel");
const RequireLogin = require("../middleware/RequireLogin");

router.get("/",RequireLogin, async function (req, res) {
  const userId = req.user._id;
  const category = await Category.find({ user: userId });
  return res.status(200).json(category);
});
router.get("/:_id", async function (req, res) {
  const categoryId = req.params._id;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "There is no such identity." });
  }
});
router.post("/",RequireLogin, async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id;

  const existingCategory = await Category.exists({ name });
  if (existingCategory) return res.status(400).send("Category already exists");

  const newCategory = await Category.create({ name, user:userId });
  return res.status(201).json(newCategory);
});

router.get("/:_id/items", async function (req, res) {
  const categoryId = req.params._id;
  try {
    const category = await Category.findById(categoryId).lean();
    const menuItems = await MenuItemCategory.find({ category: category._id }).populate("menuItem")
      .populate({
        path: "menuItem",
        match: { isDeleted: false },
      })
      .exec();
    const filteredMenuItems = menuItems.map((e) => e.menuItem).filter(Boolean);

    return res.status(200).json(filteredMenuItems);
  } catch {
    res.status(400).json({ error: "There is no such identity." });
  }
});


router.put("/:_id", async (req, res) => {
  try {
    const categoryId = req.params._id;
    const newCategoryName = req.body.name;

    if (!categoryId || !newCategoryName) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    if (typeof newCategoryName !== "string" || newCategoryName.length < 3 || newCategoryName.length > 250) {
      return res.status(400).json({ errors: ["name is invalid"] });
    }

    if (categoryId.length !== 24) {
      return res.status(400).json({ error: "Invalid category ID" });
    }
    const trimmedCategoryName = newCategoryName.trim();
    const existingCategory = await Category.findOne({ _id: { $ne: categoryId }, name: trimmedCategoryName });
    if (existingCategory) return res.status(400).json({ error: "Category name already exists" });

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name: trimmedCategoryName }, { new: true });
    const aaaa = await Category.findById(categoryId);

    if (!updatedCategory) return res.status(400).json({ error: "Category not found" });

    return res.json(updatedCategory);
  } catch {
    return res.status(400).json({ error: "There is no such category" });
  }
});

router.delete("/:_id", async (req, res) => {
  const categoryId = req.params._id;

  try {
    const menuItemExists = await MenuItemCategory.exists({ categoryId: categoryId });
    if (!menuItemExists) {
      return res.status(400).json({ error: "Category has associated menu items. Delete the menu items first." });
    }
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) return res.status(404).json({ error: "Category not found" });

    await MenuItemCategory.deleteMany({ categoryId: categoryId });

    return res.json({ message: "Category deleted successfully" });
  } catch {
    return res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
