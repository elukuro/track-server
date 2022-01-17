const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  try {
    const response = await user.save();
    if (response) {
      res.json(response);
    }
  } catch (err) {
    res.status(422).send(err.message);
  }
});

module.exports = router;
