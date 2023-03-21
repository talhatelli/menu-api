const express = require("express");
const app = express();
const port = 5001;

app.get("/", (req, res) => {
  res.send("Hello Talha!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
