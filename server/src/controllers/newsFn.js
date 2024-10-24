const News = require("../models/news");

async function getAllNews(req, res) {
  try {
    const news = await News.findAll({});
    res.status(200).send(news);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function getNews(req, res) {
  try {
    const id = req.params.id;
    const news = await News.findOne({ where: { id: id } });
    res.status(200).send(news);
  } catch (err) {
    res.status(404).send(err);
  }
}
async function createNews(req, res) {
  try {
    const news = await News.create(req.body);
    res.status(201).send("news Blog created successfully");
  } catch (err) {
    res.status(404).send(err);
  }
}
async function updateNews(req, res) {
  try {
    const id = req.params.id;
    const news = await News.update(req.body, { where: { id: id } });
    res.status(200).send("news Blog updated successfully");
  } catch (err) {
    res.status(404).send(err);
  }
}
module.exports = {
  getAllNews,
  getNews,
  createNews,
  updateNews,
};
