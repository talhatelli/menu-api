const express = require("express");
const router = express.Router();

const Category = require("../models/CategoryModel");

router.get("/new", function (req, res, next) {
  const category = new Category({
    title: "MENU"
  });
  category.save((err, data) => {
    if (err) console.log(err);
    res.json(data);
  });
});
module.exports = router;
