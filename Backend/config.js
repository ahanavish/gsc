const {initializeApp} = require("firebase/app");
const {getAnalytics} = require("firebase/analytics");
const {getFirestore} = require('firebase/firestore');

require('dotenv').config()

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY, // process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN, // process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID, // process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET, // process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID, // process.env.MESSAGING_SENDER_ID, 
  appId: process.env.APP_ID, // process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID, // process.env.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// create user collection

 // export user
module.exports = db;


