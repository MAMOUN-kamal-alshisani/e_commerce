const { db } = require("../db/db");
const Sequelize = require("sequelize");
const User = require("./user");
const Cart = db.define("Cart", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cart: {
    type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.INTEGER),
  },

  userId: {
    type: Sequelize.DataTypes.INTEGER,
  },
});

Cart.belongsTo(User);

module.exports = Cart;
