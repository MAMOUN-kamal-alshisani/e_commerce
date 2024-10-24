const { db } = require("../db/db");
const Sequelize = require("sequelize");
const Profile = db.define("Profile", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Fname: {
    type: Sequelize.DataTypes.STRING,
    allowNull:true
  },
  Lname: {
    type: Sequelize.DataTypes.STRING,
    allowNull:true
  },
  Phone: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull:true
  },
  BirthDate: {
    type: Sequelize.DataTypes.DATE,
    allowNull:true
  },
  Country: {
    type: Sequelize.DataTypes.STRING,
    allowNull:true
  },
  Address: {
    type: Sequelize.DataTypes.STRING,
    allowNull:true
  },
  Gender:{
    type: Sequelize.DataTypes.STRING,
    allowNull:true
  },
  Email: {
    type: Sequelize.DataTypes.STRING,
    allowNull:true
  },
  Photo: {
    type: Sequelize.DataTypes.STRING,
    defaultValue:
      "https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-2.jpg",
  },
  userId: {
    type: Sequelize.DataTypes.INTEGER,
  },
});

module.exports = Profile;
