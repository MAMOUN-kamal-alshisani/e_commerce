const dotenv = require("dotenv")
dotenv.config();
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
  // apiKey: "AIzaSyD0PG7QvBUtjYU0Fqz6t0ISFKGUsUIrNd4",
  // authDomain: "techstore-9a833.firebaseapp.com",
  // projectId: "techstore-9a833",
  // storageBucket: "techstore-9a833.appspot.com",
  // messagingSenderId: "238269671079",
  // appId: "1:238269671079:web:99c9a853e77c27824ddd82",
  // measurementId: "G-EJ0Q14XLKX"
};

module.exports = { firebaseConfig };

// firebaseConfig : {
//     apiKey:process.env.API_KEY ,
//     authDomain: process.env.AUTH_DOMAIN,
//     projectId: process.env.PROJECT_ID,
//     storageBucket:process.env.STORAGE_BUCKET ,
//     messagingSenderId:process.env.MESSAGING_SENDER_ID ,
//     appId: process.env.APP_ID,
//     measurementId: process.env.MEASUREMENT_ID
//   }
