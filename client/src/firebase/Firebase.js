import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA4nTKwHkFrJLsi4R2OzBC3m4HCJ76OX7I",
  authDomain: "supastrikers-3c9d2.firebaseapp.com",
  projectId: "supastrikers-3c9d2",
  storageBucket: "supastrikers-3c9d2.appspot.com",
  messagingSenderId: "1043522331224",
  appId: "1:1043522331224:web:fcea762f31eba1002b602d",
  measurementId: "G-F8Z7C3RJEQ",
});

export default firebaseApp;
