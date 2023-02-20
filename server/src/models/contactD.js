const { db } = require("../db/db");
const Sequelize = require("sequelize");

const ContactDetails = db.define("ContactD", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },
  fullName: {
    type: Sequelize.DataTypes.STRING,
default: ''
  },
  phone: {
    type: Sequelize.DataTypes.STRING,
    default: ''
  },

  birthDate:{
    type: Sequelize.DataTypes.STRING,
    default: ''
  },

  city: {
    type: Sequelize.DataTypes.STRING,
    default: ''
  },
  address: {
    type: Sequelize.DataTypes.STRING,
    default: ''
  },

  photo: {
    type: Sequelize.DataTypes.STRING,
    
    defaultValue :"https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
  },


});


module.exports = ContactDetails