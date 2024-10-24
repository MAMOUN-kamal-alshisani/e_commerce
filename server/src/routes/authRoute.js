const express = require("express");
const authRoute = express.Router();
const {signup,signin} = require("../controllers/authFn");
const { body} = require("express-validator");

authRoute.post(
  "/signup",
  [
    body('Username').trim().notEmpty().withMessage("username cannot be empty!"),
    body("Email").trim().isEmail().withMessage("input must be a valid email!"),
    // password must be at least 5 chars long
    body("Password")
      .isLength({ min: 6 })
      .withMessage("password should be at least 6 charcters long!"),
  ],
  signup
);

authRoute.post('/signin',signin)

module.exports = authRoute;
