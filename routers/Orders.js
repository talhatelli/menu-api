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
      return res.status(400).json({message: "Gönderilen veri bir dizi olmalıdır."});
    }

    const savedOrders = await Promise.all(
      ordersData.map(async orderData => {
        const {name, description, price, imageUrl, note, count, table} = orderData;

        if (!name || !price) {
          throw new Error("Ad ve fiyat gereklidir.");
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
    res.status(500).json({message: "Sipariş oluşturulurken bir hata oluştu."});
  }
});
const mongoose = require("mongoose"); // Mongoose'u ekliyoruz

router.put("/:id", async (req, res) => {
  const orderId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({error: "Geçersiz sipariş ID"});
  }

  const order = await Orders.findById(orderId);
  if (!order) {
    return res.status(404).json({error: "Sipariş bulunamadı"});
  }

  console.log("%crouters/Orders.js:57 order", "color: #26bfa5;", order);
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
