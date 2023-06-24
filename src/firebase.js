// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4xH9wTOnsfR_uG6t1lUpYef-yqIDgTi0",
  authDomain: "footwear-37104.firebaseapp.com",
  projectId: "footwear-37104",
  storageBucket: "footwear-37104.appspot.com",
  messagingSenderId: "1089328351527",
  appId: "1:1089328351527:web:505a5cca50b5210ceb4102",
  measurementId: "G-BFKJ941DHW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;