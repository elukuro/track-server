const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  try {
    const response = await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.SECRET);
    if (response) {
      res.json({ token });
    }
  } catch (err) {
    res.status(422).send(err.message);
  }
});

module.exports = router;
