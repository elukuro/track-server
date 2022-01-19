const jwt = require("jsonwebtoken");
const monggose = require("mongoose");
const User = monggose.model("User");

const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
  // every header will lowercase
  const { authorization } = req.headers;
  // authorization BEARER laksjflaskf
  if (!authorization) {
    return res.status(401).send({ error: "you must be login" });
  }
  // extract token from bearer heder
  const token = authorization.replace("Bearer ", "");
  // verity JWT
  jwt.verify(token, process.env.SECRET, async (err, payload) => {
    if (err) {
      return res
        .status(401)
        .send({ error: "you must be login because invalid token" });
    }

    const { userId } = payload;
    // find user id inside mongo DB
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
