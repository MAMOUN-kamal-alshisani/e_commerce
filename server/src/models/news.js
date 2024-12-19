const {db} = require('../db/db')
const   Sequelize = require('sequelize')

const News =  db.define('news',{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false,
        validate: {
            notEmpty: true,
          },
    },
    description:{
        type:Sequelize.DataTypes.CHAR(1000),
        validate: {
            notEmpty: true,
          },
    },
    img:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false,
        validate: {
            notEmpty: true,
          },
    }
})

module.exports = News