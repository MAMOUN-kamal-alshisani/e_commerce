const express = require("express");
const cartRoute = express.Router();
const {
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
} = require("../controllers/cartFn");
const verifyToken = require("../middlewares/verfyToken");

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

module.exports = cartRoute;
