const express = require("express");
const router = express.Router();

const CategoryRouter = require("./CategoryRouter");
const MenuItemRouter = require("./MenuItemRouter");

router.use("/categories", CategoryRouter);
router.use("/menu-items", MenuItemRouter);

module.exports = router;
