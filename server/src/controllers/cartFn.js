const Cart = require("../models/cart");
const ItemsData = require("../models/item");

async function getAllCarts(req, res) {
  try {
    const cart = await Cart.findAll({});
    console.log(cart);
    res.status(200).send(cart);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}

async function getCart(req, res) {
  try {
    const id = req.params.id;
    const cart = await Cart.findOne({ where: { id: id } });
    res.status(200).send(cart);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}

async function getUserCart(req, res) {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ where: { userId: userId } });
    let filterdIDs = cart.cart.filter((id) => id !== null);
    let ItemsArr = [];
    let ItemQuantity = {};

    for (let i = 0; i < filterdIDs.length; i++) {
      ItemQuantity[filterdIDs[i]] = ++ItemQuantity[filterdIDs[i]] || 1;
    }

    const Items = await ItemsData.findAll({
      where: { id: filterdIDs },
      raw: true,
    });
    for (let j = 0; j < Items.length; j++) {
      ItemsArr.push({
        item: Items[j],
        quantity: Object.values(ItemQuantity)[j],
      });
    }
    res.status(200).send(ItemsArr);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}
async function getItemsInCart(req, res) {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ where: { userId: userId } });
    if (cart.cart.length !== undefined || null) {
      res.status(200).send({ count: cart.cart.length });
    } else {
      res.status(200).send({ count: 0 });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}

async function createCart(req, res) {
  const carted = req.body.cart;
  const userId = req.params.userId;
  try {
    let cartAlreadyExist = await Cart.findOne({ where: { userId: userId } });
    if (cartAlreadyExist) {
      await cartAlreadyExist.update({
        cart: [...carted, ...cartAlreadyExist.cart],
      });
    } else {
      const carts = await Cart.create({
        cart: [...carted],
        userId: userId,
      });
    }
    res.status(201).send({ message: "cart created successfully" });
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}
async function createCartWithQuantity(req, res) {
  const cart = req.body.cart;
  const productQuantity = req.body.quantity;
  const userId = req.params.userId;
  const productQuantityInCart = [];
  for (let i = 0; i >= productQuantity; i++) {
    productQuantityInCart.push(...cart);
  }
  try {
    let cartAlreadyExist = await Cart.findOne({ where: { userId: userId } });
    if (cartAlreadyExist) {
      await cartAlreadyExist.update({
        cart: [...cartAlreadyExist.cart, ...productQuantityInCart],
      });
    } else {
      const carts = await Cart.create({
        cart: [...productQuantityInCart],
        userId: userId,
      });
    }
    res.status(201).send({ message: "cart created successfully" });
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}
async function deleteCart(req, res) {
  const id = req.params.id;
  try {
    const cart = await Cart.destroy({ where: { id: id } });
    res.status(201).send("cart has been removed successfully");
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

async function deleteItemQuantityCart(req, res) {
  try {
    const id = req.params.id;
    const userId = req.params.userId;
    let userCart = await Cart.findOne({ where: { userId: userId } });
    let cartArr = userCart.cart;
    const index = cartArr.indexOf(Number(id));
    if (index > -1) {
      cartArr.splice(index, 1);
    }
    let updateCart = cartArr;
    userCart.cart = userCart;
    const UpdatedCart = await userCart.update(
      {
        cart: updateCart,
      },
      { where: { userId: userId } }
    );
    res.status(201).send({ message: "cart has been removed successfully" });
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}
async function decreaseUserCart(req, res) {
  const id = req.params.id;
  const userId = req.params.userId;

  try {
    const userCart = await Cart.findOne({ where: { userId: userId } });
    const cartArr = userCart.cart;
    let filtered = cartArr.filter((itemId) => {
      return Number(itemId) !== Number(id);
    });
    const UpdatedCart = await userCart.update(
      {
        cart: filtered,
      },
      { where: { userId: userId } }
    );
    res.status(201).send("cart has been removed successfully");
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

async function updateCart(req, res) {
  const id = req.params.id;
  try {
    const cart = await Cart.update(req.body, {
      where: { id: id },
    });
    console.log(cart);
    res.status(201).send("cart has been updated successfully");
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}
async function increaseUserCart(req, res) {
  try {
    const id = Number(req.params.id);
    const userId = req.params.userId;
    let userCart = await Cart.findOne({ where: { userId: userId } });

    const cart = await userCart.update(
      {
        cart: [id, ...userCart.cart],
      },
      {
        where: { userId: userId },
      }
    );
    res.status(201).send("cart has been updated successfully");
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}

module.exports = {
  getAllCarts,
  getCart,
  getUserCart,
  getItemsInCart,
  createCart,
  deleteCart,
  decreaseUserCart,
  deleteItemQuantityCart,
  updateCart,
  increaseUserCart,
  createCartWithQuantity,
};
