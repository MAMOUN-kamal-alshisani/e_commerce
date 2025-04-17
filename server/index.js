import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

/// requiring routes ///
import {authRoute} from './src/routes/authRoute.js';
import {userRoute} from "./src/routes/userRoute.js";
import {itemRoute} from "./src/routes/itemRoute.js";
import {profileRoute} from "./src/routes/profileRoute.js";
import {cartRoute} from "./src/routes/cartRoute.js";
import {FavItemsRoute} from "./src/routes/favItemRoute.js";
import {newsRoute} from "./src/routes/newsRoute.js";
import {uploadRoute} from "./src/routes/uploadRoute.js";

import { notFound, handleError } from "./src/middlewares/errorhandlers.js";

const PORT = process.env.PORT || 4001;
const server = express();
dotenv.config();

server.get("/", (req, res) => {
  res.status(200).send("<h2>Home Route</h2>");
});

server.use(
  cors(/*{
  credentials: true,}*/)
);
server.use(morgan("tiny"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

/// routes
server.use([
  authRoute,
  userRoute,
  itemRoute,
  profileRoute,
  cartRoute,
  FavItemsRoute,
  newsRoute,
  uploadRoute,
]);
/// error handler ///
server.use("*", notFound);

server.listen(PORT, () => console.log(`Running on port ${PORT}`));

// module.exports = server;
export default server