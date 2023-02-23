const jwt = require("jsonwebtoken");
const User = require("../models/user");
require('dotenv').config()

async function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).send("you are not authenticated");
  }

  try {
    const validToken = jwt.verify(token, process.env.SECRET);

    if (validToken) {
      req.user = User.findOne({ where: { id: validToken.id } });

      next();
    }
  } catch (err) {
    res.send(err.message);
    console.log(err);
  }
}
module.exports = verifyToken;
