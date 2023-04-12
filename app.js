const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.port || 5001;
const mongoose = require("mongoose");
const router = require("./routers/index");

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI);

app.use(express.json());
app.use(router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
