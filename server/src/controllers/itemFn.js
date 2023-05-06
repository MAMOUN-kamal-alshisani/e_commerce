const Item = require("../models/item");

async function getAllItems(req, res) {
  try {
    const item = await Item.findAll({});
    res.status(200).send(item);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function getItem(req, res) {
  try {
    const id = req.params.id;
    const item = await Item.findOne({ where: { id: id } });
    res.status(200).send(item);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function createItem(req, res) {
  try {
    const item = await Item.create(req.body);
    res.status(201).send("item created successfully");
  } catch (err) {
    res.status(404).send(err);
  }
}

async function deleteItem(req, res) {
  const id = req.params.id;
  try {
    const findItem = await Item.findOne({ where: { id: id } });

    if (findItem) {
      const item = await Item.destroy({ where: { id: id } });
      res.status(200).send("item has been removed successfully");
    } else {
      return res.status(404).send(err);
    }
  } catch (err) {
    res.status(404).send(err);
  }
}

async function updateItem(req, res) {
  const id = req.params.id;

  try {
    const findItem = await Item.findOne({ where: { id: id } });
    if (findItem) {
      const item = await Item.update(req.body, {
        where: { id: id },
      });
      res.status(201).send("item has been updated successfully");
    } else {
      return res.status(404).send(err);
    }
  } catch (err) {
    // console.log(err);
    res.status(404).send(err);
  }
}

module.exports = { getAllItems, getItem, createItem, deleteItem, updateItem };
