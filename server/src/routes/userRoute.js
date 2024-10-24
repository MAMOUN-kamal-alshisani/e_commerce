const express = require("express");
const userRoute = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  UpdateUser,
} = require("../controllers/userFn");

const { verifyToken, verifyAdmin } = require("../middlewares/verfyToken");

userRoute.get("/users", /*verifyAdmin,*/ getAllUsers);
userRoute.get("/user/:id", verifyAdmin, getUser);
userRoute.post("/users", verifyAdmin, createUser);
userRoute.delete("/user/:id", verifyAdmin, deleteUser);
userRoute.put("/user/:id", verifyAdmin, UpdateUser);

module.exports = userRoute;
