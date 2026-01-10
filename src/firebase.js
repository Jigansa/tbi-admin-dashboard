import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPsR9FJYI2wjx9A5LvJpfUxCOUVfQXn5k",
  authDomain: "dashboard-tbi.firebaseapp.com",
  projectId: "dashboard-tbi",
  storageBucket: "dashboard-tbi.firebasestorage.app",
  appId: "1:831617938142:web:321923e6509494c9fb084f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export what your app needs
export const db = getFirestore(app);
export const storage = getStorage(app);
