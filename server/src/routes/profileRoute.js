const express = require("express");
const profileRoute = express.Router();
const {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  getUserContact,
} = require("../controllers/profileFn");
const {verifyToken,verifyAdmin} = require("../middlewares/verfyToken");


profileRoute.get("/contact", /*verifyToken,*/ getAllContacts);
profileRoute.get("/contact/:id", /*verifyToken,*/ getContact);
profileRoute.get("/contacted/:userId", getUserContact);

profileRoute.post("/contact/:userId" ,createContact);
profileRoute.delete("/contact/:id",verifyToken ,/*verifyToken,*/ deleteContact);
profileRoute.put("/contact/:userId", updateContact);

module.exports = profileRoute;
