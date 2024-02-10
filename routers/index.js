const express = require("express");
const router = express.Router();
const Auth = require("./Auth");
const CategoryRouter = require("./CategoryRouter");
const MenuItemRouter = require("./MenuItemRouter");

router.use("/auth", Auth);
router.use("/categories", CategoryRouter);
router.use("/menu-items", MenuItemRouter);

module.exports = router;
