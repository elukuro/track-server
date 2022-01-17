require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

const app = new express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = process.env.URL;
mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.listen(3000, () => {
  console.log("Listen on port 3000");
});
