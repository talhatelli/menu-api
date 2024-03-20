const express = require("express");
const router = express.Router();

const MenuItem = require("../models/MenuItemModel");
const Category = require("../models/CategoryModel");
const PriceHistory = require("../models/PriceHistoryModel");
const MenuItemCategory = require("../models/MenuItemCategoryModel");
const RequireLogin = require("../middleware/RequireLogin");

router.get("/", RequireLogin, async function (req, res) {
  try {
    const userId = req.user._id;
    console.log("%crouters/MenuItemRouter.js:13 userId", "color: #26bfa5;", userId);
    const userMenuItems = await MenuItem.find({user: userId, isDeleted: false});
    return res.status(200).json(userMenuItems);
  } catch (error) {
    return res.status(500).json({error: "Sunucu hatası"});
  }
});
router.get("/app", async function (req, res) {
  try {
    const userMenuItems = await MenuItem.find({isDeleted: false});
    return res.status(200).json(userMenuItems);
  } catch (error) {
    return res.status(500).json({error: "Sunucu hatası"});
  }
});
router.get("/:_id", async function (req, res) {
  const categoryId = req.params._id;
  const menuItem = await MenuItem.findById(categoryId).lean();
  const categories = await MenuItemCategory.find({menuItem: menuItem._id}).populate("category");
  return res.status(200).json({...menuItem, categories: categories.map(e => e.category)});
});

router.post("/", RequireLogin, async (req, res) => {
  try {
    const userId = req.user._id;

    const {name, description, imageUrl, price, categories} = req.body;

    if (!userId || !name || !imageUrl || !price || !categories) {
      return res.status(400).json({errors: ["user id, name, imageUrl, price, and categories are required"]});
    }

    if (typeof name !== "string" || name.length < 3 || name.length > 250) {
      return res.status(400).json({errors: ["name is invalid"]});
    }

    if (description && (typeof description !== "string" || description.length < 3 || description.length > 250)) {
      return res.status(400).json({errors: ["description is invalid"]});
    }

    if (imageUrl && !/^https?:\/\/.+/.test(imageUrl)) {
      return res.status(400).json({errors: ["imageUrl is invalid"]});
    }

    if (isNaN(price) || price < 0) {
      return res.status(400).json({errors: ["price is invalid"]});
    }

    const categoryCount = await Category.countDocuments({_id: {$in: categories}});

    if (!Array.isArray(categories) || categories.length === 0 || categoryCount !== categories.length) {
      return res.status(400).json({errors: ["Some category ids are invalid"]});
    }

    const createdMenu = await MenuItem.create({name, description, imageUrl, price, user: userId});
    await PriceHistory.create({menuItem: createdMenu._id, price: createdMenu.price});

    for (const category of categories) {
      await MenuItemCategory.findOneAndUpdate(
        {category, menuItem: createdMenu._id},
        {},
        {upsert: true, setDefaultsOnInsert: true, runValidators: true}
      );
    }

    return res.status(201).json({createdMenu});
  } catch (err) {
    return res.status(400).json({errors: ["Bad Request"]});
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    const founded = await MenuItem.findById(req.params._id);

    if (!founded) {
      return res.status(404).json({errors: ["menu item _id is invalid"]});
    }

    await MenuItem.findByIdAndUpdate(founded._id, {isDeleted: true});

    return res.status(200).json({message: "Menu item deleted successfully"});
  } catch (error) {
    return res.status(400).json({errors: ["Bad Request"]});
  }
});

router.get("/:_id/price-history", async (req, res) => {
  try {
    const founded = await MenuItem.findById(req.params._id);
    if (!founded) {
      return res.status(404).json({errors: ["menu item _id is invalid"]});
    }
    const priceHistory = await PriceHistory.find({menuItem: req.params._id});
    return res.json(priceHistory);
  } catch (err) {
    return res.status(400).json({errors: ["Bad Request"]});
  }
});

router.put("/:_id", async (req, res) => {
  try {
    const {name, description, imageUrl, price, categories} = req.body;

    if (!name || !imageUrl || !price || !categories) {
      return res.status(400).json({errors: ["name, imageUrl, price, and categories are required"]});
    }

    if (typeof name !== "string" || name.length < 3 || name.length > 250) {
      return res.status(400).json({errors: ["name is invalid"]});
    }

    if (description && (typeof description !== "string" || description.length < 3 || description.length > 250)) {
      return res.status(400).json({errors: ["description is invalid"]});
    }

    if (typeof imageUrl !== "string" && !/^https?:\/\/.+/.test(imageUrl)) {
      return res.status(400).json({errors: ["imageUrl is invalid"]});
    }

    if (isNaN(price) || price < 0) {
      return res.status(400).json({errors: ["price is invalid"]});
    }

    const categoryCount = await Category.countDocuments({_id: {$in: categories}});
    if (categoryCount !== categories.length) {
      return res.status(400).json({errors: ["Some category ids are invalid"]});
    }

    const founded = await MenuItem.findById(req.params._id);
    if (!founded) {
      return res.status(404).json({errors: ["menu item _id is invalid"]});
    }
    const updatedMenu = await MenuItem.findByIdAndUpdate(
      founded._id,
      {
        name,
        description,
        imageUrl,
        price
      },
      {new: true, runValidators: true}
    );

    if (founded.price !== updatedMenu.price) {
      await PriceHistory.create({
        menuItem: founded._id,
        price
      });
    }
    for (const element of categories) {
      await MenuItemCategory.findOneAndUpdate(
        {category: element, menuItem: updatedMenu._id},
        {},
        {
          upsert: true,
          setDefaultsOnInsert: true,
          runValidators: true
        }
      );
    }
    return res.json(updatedMenu);
  } catch (err) {
    return res.status(400).json({errors: ["Bad Request"]});
  }
});
module.exports = router;
