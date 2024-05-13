// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "global-luxury-livings.firebaseapp.com",
  projectId: "global-luxury-livings",
  storageBucket: "global-luxury-livings.appspot.com",
  messagingSenderId: "791501621364",
  appId: "1:791501621364:web:80cb2aafc63b63b342a921"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);