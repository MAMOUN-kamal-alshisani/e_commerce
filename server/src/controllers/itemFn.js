import Item from "../models/item.js";
import Sequelize from "sequelize";

// fetch all items in the database
async function getAllItems(req, res) {
  try {
    const item = await Item.findAll({});
    res.status(200).send(item);
  } catch (err) {
    res.status(404).send(err);
  }
}
// fetch one item by id
async function getItem(req, res) {
  try {
    const id = req.params.id;
    const item = await Item.findOne({ where: { id: id } });
    res.status(200).send(item);
  } catch (err) {
    res.status(404).send(err);
  }
}
// fetch an item by a specific criteria being true
async function getFeaturedItem(req, res) {
  try {
    const item = await Item.findAll({ where: { featured: true }, limit: 5 });
    res.status(200).send(item);
  } catch (err) {
    res.status(404).send(err);
  }
}
// fetch an item by a specific criteria
async function getElectronics(req, res) {
  try {
    const item = await Item.findAll({ where: { category: "Electronics" } });
    res.status(200).send(item);
  } catch (err) {
    res.status(404).send(err);
  }
}
// fetch an item by a specific criteria
async function getAccessories(req, res) {
  try {
    const item = await Item.findAll({ where: { category: "Accessories" } });
    res.status(200).send(item);
  } catch (err) {
    res.status(404).send(err);
  }
}
// fetch an item by a specific criteria
async function getItemsByLatest(req, res) {
  try {
    const Items = await Item.findAll({
      raw: true,
      order: [["createdAt", "DESC"]],
      limit: 4,
      where: {
        exclusive: {
          [Sequelize.Op.ne]: true,
        },
        featured: {
          [Sequelize.Op.ne]: true,
        },
      },
    });
    res.status(200).send(Items);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
// fetch an item by a specific criteria
async function getAllItemsByLatest(req, res) {
  try {
    const Items = await Item.findAll({
      raw: true,
      order: [["createdAt", "DESC"]],
      where: {},
    });
    res.status(200).send(Items);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
// fetch an item by a specific criteria
async function getExclusiveItem(req, res) {
  try {
    const Items = await Item.findAll({
      raw: true,
      order: [["createdAt", "DESC"]],
      limit: 1,
      where: {
        exclusive: {
          [Sequelize.Op.ne]: false,
        },
      },
    });
    res.status(200).send(Items);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
// fetch an item by a specific criteria
async function getItemPrice(req, res) {
  try {
    const PriceArr = [];
    const Items = await Item.findAll({
      attributes: ["price"],
    });
    Items.map((item) => {
      PriceArr.push(item.price);
    });
    res.status(200).send(PriceArr);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
// create an item in the database
async function createItem(req, res) {
  try {
    const item = await Item.create(req.body);
    res.status(201).send("item created successfully");
  } catch (err) {
    res.status(404).send(err);
  }
}
// remove an item from the database
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
// update item in the database
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
    res.status(404).send(err);
  }
}
// search for the items that match the keyword by character
async function searchItem(req, res) {
  try {
    const keyWord = req.query.name;
    const findItem = await Item.findAll({
      where: {
        title: {
          [Sequelize.Op.iLike]: `%${keyWord}%`,
        },
      },
    });
    if (findItem.length > 0) {
      res.send(findItem);
    } else {
      const subKeyWord = keyWord.at(0);
      const findItem = await Item.findAll({
        [Sequelize.Op.iLike]: `%${subKeyWord}%`,
      });
      res.send(findItem);
    }
  } catch (err) {
    res.send(err);
  }
}

export {
  getAllItems,
  getItem,
  getFeaturedItem,
  getElectronics,
  getAccessories,
  getItemsByLatest,
  getAllItemsByLatest,
  getExclusiveItem,
  getItemPrice,
  searchItem,
  createItem,
  updateItem,
  deleteItem,
};
