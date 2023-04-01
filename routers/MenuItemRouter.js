const express = require("express");
const router = express.Router();

const MenuItemModel = require("../models/MenuItemModel");

router.get("/menu-item-model", function (req, res, next) {
  const menu = new MenuItemModel({
    name: "analı kızlı",
    description:
      "anadoluyu yurt yapan battalgazinin diyarlarında çok meşur olan bulgurun ve et harcıyla hazırlanan enfes mi enfes yöresel yemektir",
    price: "70",
    imageUrl: "https://cdn.yemek.com/mncrop/940/625/uploads/2017/05/anali-kizli-tarifi.jpg"
  });
  menu.save((err, data) => {
    if (err) console.log(err);
    res.json(data);
  });
});
module.exports = router;
