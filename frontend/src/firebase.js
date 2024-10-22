// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-d6e2a.firebaseapp.com",
  projectId: "mern-estate-d6e2a",
  storageBucket: "mern-estate-d6e2a.appspot.com",
  messagingSenderId: "162778643498",
  appId: "1:162778643498:web:6fcdf07a58884be4095753"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);