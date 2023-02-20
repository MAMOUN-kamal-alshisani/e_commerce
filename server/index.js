const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const PORT = process.env.PORT || 4001;
const server = express();

/// requiring routes ///
const authRoute = require("./src/routes/authRoute");
const userRoute = require('./src/routes/userRoute')
const itemRoute = require('./src/routes/itemRoute')
const contactRoute = require('./src/routes/contactDRoute')
// const cartRoute = require('./src/routes/cartRoute')
const {notFound,handleError} = require('./src/middlewares/errorhandlers')
/// middlewares
// server.use(function(req, res, next) {
//   res.header('Content-Type', 'application/json;charset=UTF-8')
//   res.header('Access-Control-Allow-Credentials', true)
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   )
//   next()
// })

server.get("/",(req, res) => {
  res.status(200).send("<h2>Home Route</h2>");
});


server.use(cors({
  credentials: true,}));
server.use(morgan("tiny"));
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(cookieParser());
// server.use(session())
/// routes
server.use(authRoute);
server.use(userRoute)
server.use(itemRoute);
server.use(contactRoute)
// server.use(cartRoute)
server.use('*',notFound)


server.listen(PORT, () => console.log(`Running on port ${PORT}`));
