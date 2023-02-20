const express = require("express");
const userRoute = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  UpdateUser,
} = require("../controllers/userFn");

const verifyToken = require("../middlewares/verfyToken");

userRoute.get("/users", verifyToken, getAllUsers);
userRoute.get("/user/:id", verifyToken, getUser);
userRoute.post("/users", verifyToken, createUser);
userRoute.delete("/user/:id", verifyToken, deleteUser);
userRoute.put("/user/:id", verifyToken, UpdateUser);

module.exports = userRoute;
