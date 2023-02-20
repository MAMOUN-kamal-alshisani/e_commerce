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
const verifyToken = require("../middlewares/verfyToken");


contactRoute.get("/contact", verifyToken, getAllContacts);
contactRoute.get("/contact/:id", verifyToken, getContact);
contactRoute.get("/contacted/:UserId", getUserContact);

contactRoute.post("/contact/:userId", createContact);
contactRoute.delete("/contact/:id", verifyToken, deleteContact);
contactRoute.put("/contact/:UserId", updateContact);

module.exports = contactRoute;
