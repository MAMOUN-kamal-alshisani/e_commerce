import express from "express";

import {
  getFavItems,
  getUserFavItems,
  getItemsCountInFav,
  createFavItems,
  getUserFavItemsIds,
  deleteFavoriteProducts,
  deleteFavProducts,
} from "../controllers/favItemsFn.js";

export const FavItemsRoute = express.Router();

FavItemsRoute.get("/fav", getFavItems);
FavItemsRoute.get("/fav/user/:userId", getUserFavItems);
FavItemsRoute.get("/fav/productsId/:userId", getUserFavItemsIds);

FavItemsRoute.get("/fav/count/:userId", getItemsCountInFav);
FavItemsRoute.post("/fav/:userId", createFavItems);

FavItemsRoute.delete("/fav/:userId/:id", deleteFavoriteProducts);
FavItemsRoute.delete("/fav/:userId", deleteFavProducts);
