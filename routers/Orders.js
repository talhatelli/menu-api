const express = require("express");
const router = express.Router();

const Orders = require("../models/OrdersModel");

router.get("/", async function (req, res) {
  try {
    const ordes = await Orders.find();
    return res.status(200).json(ordes);
  } catch (error) {
    return res.status(500).json({error: "Bad request"});
  }
});

router.post("/", async (req, res) => {
  try {
    const ordersData = req.body;

    if (!Array.isArray(ordersData)) {
      return res.status(400).json({message: "The data sent must be a string."});
    }

    const savedOrders = await Promise.all(
      ordersData.map(async orderData => {
        const {name, description, price, imageUrl, note, count, table} = orderData;

        if (!name || !price) {
          throw new Error("Name and price are required.");
        }

        const order = new Orders({
          name,
          description,
          price,
          imageUrl,
          note,
          count,
          table
        });

        return order.save();
      })
    );

    res.status(201).json(savedOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "An error occurred while creating the order."});
  }
});
const mongoose = require("mongoose");

router.put("/:id", async (req, res) => {
  const orderId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({error: "Invalid Order ID"});
  }

  const order = await Orders.findById(orderId);
  if (!order) {
    return res.status(404).json({error: "Order not found"});
  }

  if (order.status === "pending") {
    order.status = "getting_ready";
    await order.save();
    return res.status(200).json(order);
  } else if (order.status === "getting_ready") {
    order.status = "ready";
    await order.save();
    return res.status(200).json(order);
  } else {
    return res.status(400).json({error: "Status invalid"});
  }
});
router.delete("/:id", async function (req, res) {
  try {
    const {id} = req.params;
    const deletedOrder = await Orders.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({error: "Order not found"});
    }

    return res.status(200).json({message: "Order deleted successfully"});
  } catch (error) {
    return res.status(500).json({error: "Internal server error"});
  }
});

module.exports = router;
