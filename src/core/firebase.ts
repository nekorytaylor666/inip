import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBuWM6gSuI2mLZSXaLsBeQ9lad57VY1qE8",
    authDomain: "inip-f7e1b.firebaseapp.com",
    projectId: "inip-f7e1b",
    storageBucket: "inip-f7e1b.appspot.com",
    messagingSenderId: "984522415489",
    appId: "1:984522415489:web:01d08d22499c0a046edc80",
    measurementId: "G-W6WG8LWMDL",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseAnalytics = getAnalytics(firebaseApp);
