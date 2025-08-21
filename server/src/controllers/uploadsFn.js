import multer from "multer";
import firebaseConfig from "../config/firebase.config.js";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

// create an instance for firbase data which used in this case to store pictures
initializeApp(firebaseConfig.firebaseConfig);
const storage = getStorage();
const uploadUserImg = multer({ storage: multer.memoryStorage() });
// store pictures in firebase database
async function handleUserPictureUpload(req, res) {
  try {
    const storageRef = ref(
      storage,
      `/pictures/${Date.now() + req.file.originalname}`
    );
    const metadata = {
      contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);
    res.status(201).json({
      message: "file uploaded to firebase storage",
      name: req.file.originalname,
      type: req.file.mimetype,
      downloadURL: downloadURL,
    });
  } catch (err) {
    console.log(err);
  }
}

export { uploadUserImg, handleUserPictureUpload };
