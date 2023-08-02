const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.port || 5001;
const mongoose = require("mongoose");
const routerIndex = require("./routers/index");
const morgan = require("morgan");
const cors = require("cors");

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI);

app.use(morgan("combined"));
app.use(express.json());
app.use(cors());
app.use("/", routerIndex);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
