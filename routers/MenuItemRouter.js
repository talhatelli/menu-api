const express = require("express");
const router = express.Router();

const MenuItem = require("../models/MenuItemModel");
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
module.exports = router;
