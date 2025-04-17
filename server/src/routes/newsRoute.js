import express from "express";

export const newsRoute = express.Router();

import {
  getAllNews,
  getNews,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/newsFn.js";

newsRoute.get("/news", getAllNews);
newsRoute.get("/news/:id", getNews);
newsRoute.post("/news", createNews);
newsRoute.put("/news/:id", updateNews);
newsRoute.delete("/news/:id", deleteNews);
