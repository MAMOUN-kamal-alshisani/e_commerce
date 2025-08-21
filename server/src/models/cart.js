import db from "../db/db.js";
import Sequelize from "sequelize";
import User from "./user.js";

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

export default Cart;
