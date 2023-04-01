//app in calismaya basladigi ilk yer, database connection baslattigin yer. 400 500lu hata kodlarini dondugun yer
const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.port || 5001;
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI);

const category = require("./routers/CategoryRouter");
const menu = require("./routers/MenuItemRouter");

app.use("/category", category);
app.use("/menu", menu);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
