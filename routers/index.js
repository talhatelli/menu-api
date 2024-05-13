const express = require("express");
const router = express.Router();
const Auth = require("./Auth");
const CategoryRouter = require("./CategoryRouter");
const MenuItemRouter = require("./MenuItemRouter");
const Orders = require("./Orders");

router.use("/auth", Auth);
router.use("/orders", Orders);
router.use("/categories", CategoryRouter);
router.use("/menu-items", MenuItemRouter);

module.exports = router;
