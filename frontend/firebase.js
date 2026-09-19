// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "multiagentcodeeditor.firebaseapp.com",
  projectId: "multiagentcodeeditor",
  storageBucket: "multiagentcodeeditor.firebasestorage.app",
  messagingSenderId: "754596513331",
  appId: "1:754596513331:web:f8291b53022ceaac5a4546"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider()