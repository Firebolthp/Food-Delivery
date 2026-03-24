// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "bingoo-299fc.firebaseapp.com",
  projectId: "bingoo-299fc",
  storageBucket: "bingoo-299fc.firebasestorage.app",
  messagingSenderId: "570754977866",
  appId: "1:570754977866:web:e1eb241fcfa7ef601896b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth}