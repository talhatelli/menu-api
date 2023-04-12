const express = require("express");
const router = express.Router();

const CategoryRouter = require("./CategoryRouter");
const MenuItemRouter = require("./MenuItemRouter");

router.use(CategoryRouter);
router.use(MenuItemRouter);

module.exports = router;
