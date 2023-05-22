// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4nTKwHkFrJLsi4R2OzBC3m4HCJ76OX7I",
    authDomain: "supastrikers-3c9d2.firebaseapp.com",
    projectId: "supastrikers-3c9d2",
    storageBucket: "supastrikers-3c9d2.appspot.com",
    messagingSenderId: "1043522331224",
    appId: "1:1043522331224:web:fcea762f31eba1002b602d",
    measurementId: "G-F8Z7C3RJEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);