import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXD2P4FCHfM8dnYpgKc2BNoeNnEsjVDOk",
  authDomain: "edusipas.firebaseapp.com",
  projectId: "edusipas",
  storageBucket: "edusipas.firebasestorage.app",
  messagingSenderId: "466322143631",
  appId: "1:466322143631:web:1a01d1dc1bbc971b26b3fa",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);