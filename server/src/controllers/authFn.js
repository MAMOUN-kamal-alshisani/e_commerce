const User = require("../models/user");
// const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function createToken(id) {
  return jwt.sign({ id: id }, process.env.SECRET);
}

async function signup(req, res) {
  try {
    const { Username, Email, Password } = req.body;
    const genSalt = bcrypt.genSaltSync(16);
    const hashedPassword = bcrypt.hashSync(Password, genSalt);
    const EmailUser = await User.findOne({ where: { Email } });

    if (EmailUser) {

      res.status(500).send({ msg: "email is already in use" });
    } else {
      const user = await User.create({
        Username: Username,
        Email: Email,
        Password: hashedPassword,
      });
      // create jwt
      const token = createToken(user.id);
      console.log(token);
    await  res
        .cookie("token", token, { httpOnly: true } /*{maxAge:10000}*/)
        .status(201)
        .send({ token: token, user: user });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function signin(req, res) {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({ where: { Email: Email } });
    if (!user) return res.status(404).send("email is incorrect");
    const validPass = await bcrypt.compare(Password, user.Password);
    if (!validPass) return res.status(404).send("password is incorrect");

    const token = createToken(user.id);
   await res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(200)
      .send({
        token,
        user: { id: user.id, username: user.Username, email: user.Email },
      });
  } catch (err) {
    res.status(404).send(err);
  }
}

module.exports = { signup, signin };
