const Item = require("../models/item");

async function getAllItems(req, res) {
  try {
    //  console.log(    res.cookie('toke','sad'));

    const item = await Item.findAll({});
    console.log(item);
    res.status(200).send(item);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}

async function getItem(req, res) {
  try {
    const id = req.params.id;
    const item = await Item.findOne({ where: { id: id } });
    res.status(200).send(item);
    console.log(item);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}

async function createItem(req, res) {
  try {
    const item = await Item.create(req.body);

    console.log(item);
    res.status(201).send("item created successfully");
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
}

async function deleteItem(req, res) {
  const id = req.params.id;
  try {
    const item = await Item.destroy({ where: { id: id } });

    console.log(item);

    res.status(201).send("item has been removed successfully");
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

async function updateItem(req, res) {
  const id = req.params.id;

  try {
    const item = await Item.update(req.body, {
      where: { id: id },
    });
    console.log(item);
    res.status(201).send("item has been updated successfully");
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}

module.exports = { getAllItems, getItem, createItem, deleteItem, updateItem };
