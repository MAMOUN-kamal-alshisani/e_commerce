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

  },
  phone: {
    type: Sequelize.DataTypes.STRING,
  },

  birthDate:{
    type: Sequelize.DataTypes.STRING,
  },

  city: {
    type: Sequelize.DataTypes.STRING,
  },
  address: {
    type: Sequelize.DataTypes.STRING,
  },

  photo: {
    type: Sequelize.DataTypes.STRING,
    
    defaultValue :"https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
  },


});


module.exports = ContactDetails