// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtvMlrOFh2YJ3hAI2XA5re6jihcHSSY_I",
  authDomain: "migrant-buddies.firebaseapp.com",
  projectId: "migrant-buddies",
  storageBucket: "migrant-buddies.appspot.com",
  messagingSenderId: "739776318752",
  appId: "1:739776318752:web:ccb5dc8d51fd0a93c6db45",
  measurementId: "G-HW1XVKGGBP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth };
