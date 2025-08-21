import express from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  UpdateUser,
} from "../controllers/userFn.js";
import { verifyToken, verifyAdmin } from "../middlewares/verfyToken.js";

export const userRoute = express.Router();

userRoute.get("/users", /*verifyAdmin,*/ getAllUsers);
userRoute.get("/user/:id", verifyAdmin, getUser);
userRoute.post("/users", verifyAdmin, createUser);
userRoute.delete("/user/:id", verifyAdmin, deleteUser);
userRoute.put("/user/:id", verifyAdmin, UpdateUser);
