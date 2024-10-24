const Sequelize = require("sequelize");
const User = require("./user");
const { db } = require("../db/db");

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

module.exports = FavItems;
