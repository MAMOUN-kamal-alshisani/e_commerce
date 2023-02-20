
/// for future dev




// const Cart = require("../models/cart");

// async function getAllCarts(req, res) {
//   try {
//     //  console.log(    res.cookie('toke','sad'));

//     const cart = await Cart.findAll({});
//     console.log(cart);
//     res.status(200).send(cart);
//   } catch (err) {
//     console.log(err);
//     res.status(404).send(err.message);
//   }
// }

// async function getCart(req, res) {
//   try {
//     const id = req.params.id;
//     const cart = await Cart.findOne({ where: { id: id } });
//     res.status(200).send(cart);
//     console.log(cart);
//   } catch (err) {
//     console.log(err);
//     res.status(404).send(err.message);
//   }
// }

// async function getUserCart(req, res) {
//   try {
//     const UserId = req.params.UserId;
//     const cart = await Cart.findOne({ where: { UserId: UserId } });
//     res.status(200).send(cart);
//     console.log(cart);
//   } catch (err) {
//     console.log(err);
//     res.status(404).send(err.message);
//   }
// }

// async function createCart(req, res) {
//   const { id, cart } = req.body;
//   const UserId = req.params.UserId;
//   try {
//     let carted = await Cart.findOne({ where: { UserId: UserId } });
// console.log(carted);
//     if (carted) {
//       carted.push(cart);
//       console.log('item has been pushed!');
//     } else {
//       const carts = await Cart.create({
//         cart: cart,
//         UserId: UserId,
//       });
//     }
//     //     const carts = await Cart.create({
//     // cart:cart,
//     // UserId:UserId
//     //     });

//     res.status(201).send("cart created successfully");
//   } catch (err) {
//     console.log(err);
//     res.status(404).send(err.message);
//   }
// }

// async function deleteCart(req, res) {
//   const id = req.params.id;
//   try {
//     const cart = await Cart.destroy({ where: { id: id } });

//     console.log(cart);

//     res.status(201).send("cart has been removed successfully");
//   } catch (err) {
//     console.log(err);
//     res.status(404).send(err);
//   }
// }

// async function updateCart(req, res) {
//   const { Username, Email, Password } = req.body;
//   const id = req.params.id;

//   try {
//     const cart = await Cart.update(req.body, {
//       where: { id: id },
//     });
//     console.log(cart);
//     res.status(201).send("cart has been updated successfully");
//   } catch (err) {
//     console.log(err);
//     res.status(404).send(err.message);
//   }
// }

// module.exports = {
//   getAllCarts,
//   getCart,
//   getUserCart,
//   createCart,
//   deleteCart,
//   updateCart,
// };
