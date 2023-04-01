const express = require("express");
const router = express.Router();

const MenuItem = require("../models/MenuItemModel");

router.post("/", async function (req, res, next) {
  const menu = await MenuItem.create({
    name: "analı kızlı",
    description:
      "anadoluyu yurt yapan battalgazinin diyarlarında çok meşur olan bulgurun ve et harcıyla hazırlanan enfes mi enfes yöresel yemektir",
    price: "70",
    imageUrl: "https://cdn.yemek.com/mncrop/940/625/uploads/2017/05/anali-kizli-tarifi.jpg"
  });
});
module.exports = router;
