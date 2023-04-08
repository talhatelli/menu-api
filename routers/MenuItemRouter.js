const express = require("express");
const router = express.Router();

const MenuItem = require("../models/MenuItemModel");
const Category = require("../models/CategoryModel");
const PriceHistory = require("../models/priceHistoryModel");
const MenuItemCategory = require("../models/menuItemCategoryModel");
const {get, json} = require("express/lib/response");

router.post("/", async function (req, res, next) {
  const menu = await MenuItem.create({
    name: "analı kızlı",
    description:
      "anadoluyu yurt yapan battalgazinin diyarlarında çok meşur olan bulgurun ve et harcıyla hazırlanan enfes mi enfes yöresel yemektir",
    price: "70",
    imageUrl: "https://cdn.yemek.com/mncrop/940/625/uploads/2017/05/anali-kizli-tarifi.jpg"
  });
});
router.get("/", async function (req, res, next) {
  const data = await MenuItem.find({});
  res.send(data);
});
router.get("/malatya:id", async function (req, res, next) {
  const data = await MenuItem.findById("642845832275aedd467d2562");
  res.send(data);
});

router.post("/menu-items", async (req, res, next) => {
  try {
    const {name, description, image_url, price, categories} = req.body;

    if (!name || !image_url || !price || !categories) {
      return res.status(400).json({errors: ["name, image_url, price, and categories are required"]});
    }

    if (typeof name !== "string" || name.length < 3 || name.length > 250) {
      return res.status(400).json({errors: ["name is invalid"]});
    }

    if (description && (typeof description !== "string" || description.length < 3 || description.length > 250)) {
      return res.status(400).json({errors: ["description is invalid"]});
    }

    if (image_url && !/^https?:\/\/.+/.test(image_url)) {
      return res.status(400).json({errors: ["image_url is invalid"]});
    }

    if (typeof price !== "number" || price < 0) {
      return res.status(400).json({errors: ["price is invalid"]});
    }

    const categoryCount = await Category.countDocuments({_id: {$in: categories}});
    if (categoryCount !== categories.length) {
      return res.status(400).json({errors: ["Some category ids are invalid"]});
    }

    const createdMenu = await MenuItem.create({name, description, image_url, price});
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
    console.error(err);
    return res.status(500).json({errors: ["Internal Server Error"]});
  }
});
module.exports = router;
