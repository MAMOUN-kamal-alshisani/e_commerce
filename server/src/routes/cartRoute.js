import express from 'express'
import  {
  getAllCarts,
  getCart,
  getUserCart,
  getItemsInCart,
  createCart,
  deleteCart,
  decreaseUserCart,
  deleteItemQuantityCart,
  updateCart,
  increaseUserCart,
} from "../controllers/cartFn.js"

export const cartRoute = express.Router();

// const verifyToken = require("../middlewares/verfyToken.js");

cartRoute.get("/cart", /*verifyToken,*/ getAllCarts);
cartRoute.get("/cart/:id", /*verifyToken,*/ getCart);
cartRoute.get("/carted/:userId", getUserCart);
cartRoute.get("/cart/count/:userId", getItemsInCart);

cartRoute.post("/cart/:userId", /*verifyToken,*/ createCart);

cartRoute.delete("/cart/:id", /*verifyToken,*/ deleteCart);
cartRoute.delete("/cart/:userId/:id", /*verifyToken,*/ decreaseUserCart);
cartRoute.delete(
  "/cart/item/:userId/:id",
  /*verifyToken,*/ deleteItemQuantityCart
);

cartRoute.put("/cart/:id", /*verifyToken,*/ updateCart);
cartRoute.put("/cart/item/:userId/:id", /*verifyToken,*/ increaseUserCart);


 