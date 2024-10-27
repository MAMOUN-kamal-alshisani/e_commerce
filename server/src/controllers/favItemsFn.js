const FavItems = require("../models/favorite");
const ItemsData = require("../models/item");

async function getFavItems(req, res) {
  try {
    const FavItem = await FavItems.findAll({});
    res.status(200).send(FavItem);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function getUserFavItemsIds(req, res) {
  try {
    const userId = req.params.userId;
    if(userId !== undefined){
      const favItems = await FavItems.findOne({ where: { userId: userId } });
      let filterdIDs = favItems.favorite.filter((id) => id !== null);
      res.status(200).send(filterdIDs);
    }
  else{
    res.status(404).send(filterdIDs);
  }
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}
async function getUserFavItems(req, res) {
  try {
    const userId = req.params.userId;
    const favItems = await FavItems.findOne({ where: { userId: userId } });
    let filterdIDs = favItems.favorite.filter((id) => id !== null);
    let FavItemsArr = [];

    const Items = await ItemsData.findAll({
      where: { id: filterdIDs },
      raw: true,
    });

    for (let j = 0; j < Items.length; j++) {
      FavItemsArr.push({
        item: Items[j],
      });
    }
    res.status(200).send(FavItemsArr);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}
async function getItemsCountInFav(req, res) {
  try {
    const userId = req.params.userId;

    const favItems = await FavItems.findOne({ where: { userId: userId } });
    let filteredFavItems = [];
    if (favItems.favorite !== null) {
      filteredFavItems = [...new Set(favItems.favorite)];
    }

    if (favItems.favorite == null) {
      res.status(200).send({ count: "0" });
    }
    res.status(200).send({ count: filteredFavItems.length });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: err.message });
  }
}

async function createFavItems(req, res) {
  try {
    const userId = req.params.userId;
    const favorite = req.body.favorite;
    const favItemsAlreadyExist = await FavItems.findOne({
      where: { userId: userId },
    });
    if (favItemsAlreadyExist) {
      let favProduct = Number(favorite.join(""));
      if (favItemsAlreadyExist.favorite.includes(favProduct)) {
        res.status(204).send({ message: "product is already add!" });
      } else {
        await favItemsAlreadyExist.update({
          favorite: [...favItemsAlreadyExist.favorite, ...favorite],
        });
        res.status(204).send({ message: "product added!" });
      }
    } else {
      const favoriteProduct = await FavItems.create({
        favorite: [...favorite],
        userId: userId,
      });
      res.status(201).send({ message: "product has been added!" });
    }
  } catch (err) {
    console.log(err);

    res.status(500).send(err);
  }
}
async function deleteFavoriteProducts(req, res) {
  try {
    const id = req.params.id;
    const userId = req.params.userId;
    const FavoriteProductList = await FavItems.findOne({
      where: { userId: userId },
    });
    let FavoriteProductsArr = FavoriteProductList.favorite;
    const index = FavoriteProductsArr.indexOf(Number(id));
    if (index > -1) {
      FavoriteProductsArr.splice(index, 1);
    }
    let updateFavoriteProductsList = FavoriteProductsArr;
    FavoriteProductList.favorite = FavoriteProductList;

    const UpdatedFavoriteProductsList = await FavItems.update(
      {
        favorite: updateFavoriteProductsList,
      },
      { where: { userId: userId } }
    );

    res.status(200).send({ message: "product has been removed successfully!" });
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

async function deleteFavProducts(req, res) {
  const userId = req.params.userId;
  try {
    const RemoveFavoriteProductList = await FavItems.destroy({
      where: { userId: userId },
    });
    res.status(200).send("wishList has been removed successfully");
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}
module.exports = {
  getFavItems,
  getUserFavItems,
  getItemsCountInFav,
  createFavItems,
  getUserFavItemsIds,
  deleteFavoriteProducts,
  deleteFavProducts,
};
