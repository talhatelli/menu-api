const express = require("express");
const router = express.Router();

const Category = require("../models/CategoryModel");

router.get("/", function (req, res, next) {
  const category = new Category({
    localFoods: "Yöresel Yemekler",
    meats: "Etler",
    pastas: "Makarnalar",
    desserts: "Tatlılar",
    hotDrinks: "Sıcak İçecekler",
    coldDrinks: "Soğuk İçecekler"
  });
  category.save((err, data) => {
    if (err) console.log(err);
    res.json(data);
  });
});
module.exports = router;
