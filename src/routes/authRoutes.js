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
      res.send({ token });
    }
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "must provide email and password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "email not found" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, process.env.SECRET);
    res.send({ token });
  } catch (err) {
    console.log(err);
    return res.status(422).send({ error: err });
  }
});

module.exports = router;
