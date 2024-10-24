const express = require("express");

const newsRoute = express.Router();

const { getAllNews, getNews, createNews,updateNews } = require("../controllers/newsFn");

newsRoute.get("/news", getAllNews);
newsRoute.get("/news/:id", getNews);
newsRoute.post("/news", createNews);
newsRoute.put("/news/:id", updateNews);

module.exports = newsRoute