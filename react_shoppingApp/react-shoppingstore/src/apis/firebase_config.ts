import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVuZw-phvs1uX_U0kCXzEAMWJ87bX15NI",
  authDomain: "react-firebase-18eca.firebaseapp.com",
  projectId: "react-firebase-18eca",
  storageBucket: "react-firebase-18eca.appspot.com",
  messagingSenderId: "903700521112",
  appId: "1:903700521112:web:a2889c65046ec27ebc70ed",
  measurementId: "G-6TY0WS8TRN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
