const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middleware/requireAuth");

const Track = mongoose.model("Track");
const router = express.Router();

// need to check auth
router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });
  res.send(tracks);
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;
  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: "you must provide name and location" });
  }
  try {
    const track = new Track({ name, locations, userId: req.user._id });
    const response = await track.save();
    return res.send(response);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
