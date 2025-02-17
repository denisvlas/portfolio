// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlJN771ltK3vJBeGm1kxAHvjRI3M6hvQ0",
  authDomain: "portfolio-89fa8.firebaseapp.com",
  projectId: "portfolio-89fa8",
  storageBucket: "portfolio-89fa8.firebasestorage.app",
  messagingSenderId: "614139946182",
  appId: "1:614139946182:web:eeb2722eb1faafc88da3c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);