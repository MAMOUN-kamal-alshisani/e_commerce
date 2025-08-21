import News from "../models/news.js";
// fetch all the news lists from the databsae
async function getAllNews(req, res) {
  try {
    const news = await News.findAll({});
    res.status(200).send(news);
  } catch (err) {
    res.status(404).send(err);
  }
}
// fetch news list by id
async function getNews(req, res) {
  try {
    const id = req.params.id;
    const news = await News.findOne({ where: { id: id } });
    res.status(200).send(news);
  } catch (err) {
    res.status(404).send(err);
  }
}
// create new news data
async function createNews(req, res) {
  try {
    const news = await News.create(req.body);
    res.status(201).send("news Blog created successfully");
  } catch (err) {
    res.status(404).send(err);
  }
}

// update existing news data
async function updateNews(req, res) {
  try {
    const id = req.params.id;
    const news = await News.update(req.body, { where: { id: id } });
    res.status(200).send("news Blog updated successfully");
  } catch (err) {
    res.status(404).send(err);
  }
}
// romove intended news post by id
async function deleteNews(req, res) {
  const id = req.params.id;
  try {
    const findNews= await News.findOne({ where: { id: id } });
    if (findNews) {
      const item = await News.destroy({ where: { id: id } });
      res.status(200).send("News Post has been removed successfully");
    } else {
      return res.status(404).send(err);
    }
  } catch (err) {
    res.status(404).send(err);
  }
}
export  {
    getAllNews,
    getNews,
    createNews,
    updateNews,
    deleteNews
  }