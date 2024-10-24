
const express = require("express");
const uploadRoute = express.Router();
const {
  uploadUserImg,
  handleUserPictureUpload,
} = require("../controllers/uploadsFn");

uploadRoute.post(
  "/api/upload",
  uploadUserImg.single("file"),
  handleUserPictureUpload
);

module.exports = uploadRoute;
