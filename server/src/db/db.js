import { Sequelize } from "sequelize";
import dotenv from "dotenv";


dotenv.config();
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

const db = sql;

export default db;
