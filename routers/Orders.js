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
        const {name, description, price, imageUrl, note, count} = orderData;

        if (!name || !price) {
          throw new Error("Ad ve fiyat gereklidir.");
        }

        const order = new Orders({
          name,
          description,
          price,
          imageUrl,
          note,
          count
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
router.put("/:id", async (req, res) => {
  const orderId = parseInt(req.params.id);
  const controller = Orders.find(order => order.id === orderId);
  if (!controller) {
    return res.status(404).json({error: "Sipariş bulunamadı"});
  }
  const order = await Orders.findOne({_id: orderId});

  console.log("%crouters/Orders.js:57 order", "color: #26bfa5;", order);
  if (order.status === "pending") {
    order.status = "getting_ready";
    return res.status(200).json(order);
  } else if (order.status === "getting_ready") {
    order.status = "ready";
    return res.status(200).json(order);
  } else {
    return res.status(400).json({error: "Status invalid"});
  }
});

module.exports = router;
