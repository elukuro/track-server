const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = new express();

const mongoUri = process.env.URL;
mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", (req, res) => {
  res.send("Hi there");
});

app.listen(3000, () => {
  console.log("Listen on port 3000");
});
