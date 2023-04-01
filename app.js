//app in calismaya basladigi ilk yer, database connection baslattigin yer. 400 500lu hata kodlarini dondugun yer
const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.port || 5001;
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI);

const category = require("./routers/CategoryRouter");

app.use("/category", category);

app.get("/", (req, res) => {
  res.send("Hello Talha!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
