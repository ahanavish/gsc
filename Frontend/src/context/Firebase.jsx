// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyADVQSN_gaA0sP0Iz6cBqZ2VTAPZdrrU2c",
    authDomain: "gsc-project-379907.firebaseapp.com",
    projectId: "gsc-project-379907",
    storageBucket: "gsc-project-379907.appspot.com",
    messagingSenderId: "195165307652",
    appId: "1:195165307652:web:7c7fc467e4895d49c80651"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);