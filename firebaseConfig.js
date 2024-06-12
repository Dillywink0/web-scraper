// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLF0gdv37Pt9TDPCH-yG-5AQbJe5CHAW4",
  authDomain: "gpu-web-scraper.firebaseapp.com",
  projectId: "gpu-web-scraper",
  storageBucket: "gpu-web-scraper.appspot.com",
  messagingSenderId: "594335946617",
  appId: "1:594335946617:web:e57e46d1c525c677a001a8",
  measurementId: "G-XBTDTV88F4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirebase(app);