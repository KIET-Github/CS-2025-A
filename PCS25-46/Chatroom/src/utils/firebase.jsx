// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtON1BO4ZIuK8--xBDXYJ9CEuTtd4eaJA",
  authDomain: "chatbot-357b5.firebaseapp.com",
  projectId: "chatbot-357b5",
  storageBucket: "chatbot-357b5.appspot.com",
  messagingSenderId: "578136197825",
  appId: "1:578136197825:web:0cce289e14a527c8892240",
  measurementId: "G-91V18LM1PS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
  export  const auth = getAuth();


  //AIzaSyDtON1BO4ZIuK8--xBDXYJ9CEuTtd4eaJA