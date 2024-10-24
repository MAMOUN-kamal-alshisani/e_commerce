const express = require("express");
const itemRoute = express.Router();
const {
  getAllItems,
  getItem,
  getFeaturedItem,
  getElectronics,
  getAccessories,
  getItemsByLatest,
  getAllItemsByLatest,
  getExclusiveItem,
  createItem,
  deleteItem,
  updateItem,
  getItemPrice,
  searchItem,
} = require("../controllers/itemFn");
const { verifyToken, verifyAdmin } = require("../middlewares/verfyToken");
itemRoute.get("/item", /*verifyToken,*/ getAllItems);
itemRoute.get("/item/:id", getItem);
itemRoute.get("/item/group/featured", getFeaturedItem);
itemRoute.get("/item/group/price", getItemPrice);

itemRoute.get("/item/category/electronics", getElectronics);
itemRoute.get("/item/category/accessories", getAccessories);
itemRoute.get("/item/by/latest", getItemsByLatest);
itemRoute.get("/item/all/latest", getAllItemsByLatest);
itemRoute.get("/item/search/key", searchItem);
itemRoute.get("/item/by/exclusive", getExclusiveItem);

itemRoute.post("/item", /*verifyAdmin,*/ createItem);
itemRoute.delete("/item/:id", /*verifyAdmin,*/ /*verifyToken,*/ deleteItem);
itemRoute.put("/item/:id", /*verifyAdmin,*/ updateItem);

module.exports = itemRoute;
