import express from 'express'
import  {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  getUserContact,
} from "../controllers/profileFn.js";
import {verifyToken,verifyAdmin} from "../middlewares/verfyToken.js";

export const profileRoute = express.Router();

profileRoute.get("/contact", /*verifyToken,*/ getAllContacts);
profileRoute.get("/contact/:id", /*verifyToken,*/ getContact);
profileRoute.get("/contacted/:userId", getUserContact);
// profileRoute.post("/contact/picture/:userId",createContact);

profileRoute.post("/contact/:userId" ,createContact);
profileRoute.delete("/contact/:id",verifyToken ,/*verifyToken,*/ deleteContact);
profileRoute.put("/contact/picture/:userId", updateContact);

