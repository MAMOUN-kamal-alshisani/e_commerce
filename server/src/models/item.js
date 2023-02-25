const { db } = require("../db/db");
const Sequelize = require("sequelize");

const ItemsData = db.define("Item", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },
  title: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  desc: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  stock: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  img: {
    type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = ItemsData;
