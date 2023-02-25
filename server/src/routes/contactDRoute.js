const express = require("express");
const contactRoute = express.Router();
const {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  getUserContact,
} = require("../controllers/contactD_Fn");
const {verifyToken,verifyAdmin} = require("../middlewares/verfyToken");


contactRoute.get("/contact", /*verifyToken,*/ getAllContacts);
contactRoute.get("/contact/:id", /*verifyToken,*/ getContact);
contactRoute.get("/contacted/:UserId", getUserContact);

contactRoute.post("/contact/:userId",verifyToken ,createContact);
contactRoute.delete("/contact/:id",verifyToken ,/*verifyToken,*/ deleteContact);
contactRoute.put("/contact/:UserId",verifyToken ,updateContact);

module.exports = contactRoute;
