const Sequelize = require("sequelize");
require("dotenv").config();
const sql = new Sequelize(process.env.DATABASE);

sql
  .authenticate()
  .then(() => {
    console.log("connected to database successfully!");
  })
  .catch((err) => console.error(err));

sql
  .sync({ alter: true })
  .then(() => console.log("database models have been created successfully"))
  .catch((err) => console.error(err));

module.exports = { db: sql };
