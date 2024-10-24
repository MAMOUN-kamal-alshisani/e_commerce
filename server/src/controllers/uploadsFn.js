const multer = require("multer");
const { firebaseConfig } = require("../config/firebase.config");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

initializeApp(firebaseConfig);

const storage = getStorage();

const uploadUserImg = multer({ storage: multer.memoryStorage() });

async function handleUserPictureUpload(req, res) {
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
}

module.exports = {
  uploadUserImg,
  handleUserPictureUpload,
};
