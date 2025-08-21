import Sequelize from "sequelize";
import User from "./user.js";
import db from "../db/db.js";

const FavItems = db.define("Favorite", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  favorite: {
    type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.INTEGER),
    allowNull: true,
  },
  userId: {
    type: Sequelize.DataTypes.INTEGER,
  },
});
FavItems.belongsTo(User);

export default FavItems;
