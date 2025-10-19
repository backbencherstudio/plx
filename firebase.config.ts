// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider,getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZFNQ5ZaIagrIUWgt0SXwBW_kRgwrMoxw",
  authDomain: "plx-7d1e4.firebaseapp.com",
  projectId: "plx-7d1e4",
  storageBucket: "plx-7d1e4.firebasestorage.app",
  messagingSenderId: "710222733109",
  appId: "1:710222733109:web:1c904b0e7bb95ff348767c",
  measurementId: "G-CQ9XNDEF1G"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;