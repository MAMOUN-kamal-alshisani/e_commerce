const { db } = require('../db/db');
const Sequelize = require("sequelize");
const Profile = require("./profile");
const User = db.define("User", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Username: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 20],
    },
  },
  Email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  Password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 6,
    },
  },

  isAdmin: {
    type: Sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});


User.hasOne(Profile);
Profile.belongsTo(User);
module.exports = User;
