import express from 'express';
import {signup,signin} from '../controllers/authFn.js'
import {body} from "express-validator"

export const authRoute = express.Router();

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
