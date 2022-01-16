const express = require("express");
const app = new express();

app.get("/", (req, res) => {
  res.send("Hi there");
});

app.listen(3000, () => {
  console.log("Listen on port 3000");
});
