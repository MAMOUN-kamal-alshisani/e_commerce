import express from 'express'
import {
  uploadUserImg,
  handleUserPictureUpload,
} from "../controllers/uploadsFn.js";

export const uploadRoute = express.Router();

uploadRoute.post(
  "/api/upload",
  uploadUserImg.single("file"),
  handleUserPictureUpload
);

 
