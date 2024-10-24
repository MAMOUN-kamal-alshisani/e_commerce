const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 4001;
const server = express();

/// requiring routes ///
const authRoute = require("./src/routes/authRoute");
const userRoute = require("./src/routes/userRoute");
const itemRoute = require("./src/routes/itemRoute");
const profileRoute = require("./src/routes/profileRoute");
const cartRoute = require("./src/routes/cartRoute");
const FavItemsRoute = require("./src/routes/favItemRoute");
const newsRoute = require("./src/routes/newsRoute");
const uploadRoute = require("./src/routes/uploadRoute");

/// middlewares
const { notFound, handleError } = require("./src/middlewares/errorhandlers");

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

module.exports = server;
