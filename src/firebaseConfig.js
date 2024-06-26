// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYr83JRqL7vKdVAvNYkVFx6vwwr7u2cRI",
  authDomain: "guessgame-e3a74.firebaseapp.com",
  projectId: "guessgame-e3a74",
  storageBucket: "guessgame-e3a74.appspot.com",
  messagingSenderId: "863975091641",
  appId: "1:863975091641:web:d023102b45264fd3045a68",
  measurementId: "G-FJ5F0JM26Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
export {auth};
export {database};