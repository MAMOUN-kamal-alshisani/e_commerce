const express = require("express");
const itemRoute = express.Router();
const {
  getAllItems,
  getItem,
  createItem,
  deleteItem,
  updateItem,
} = require("../controllers/itemFn");
const {verifyToken,verifyAdmin} = require('../middlewares/verfyToken')
itemRoute.get("/item",/*verifyToken,*/ getAllItems);
itemRoute.get("/item/:id", getItem);
itemRoute.post("/item" ,verifyAdmin,createItem);
itemRoute.delete("/item/:id",verifyAdmin,/* verifyToken,*/deleteItem);
itemRoute.put("/item/:id",verifyAdmin ,/*verifyToken,*/updateItem);

module.exports = itemRoute;
