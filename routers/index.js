const express = require("express");
const router = express.Router();

const categoryRouter = require("./CategoryRouter");
const menuItemRouter = require("./MenuItemRouter");

router.use(categoryRouter);
router.use(menuItemRouter);

module.exports = router;
