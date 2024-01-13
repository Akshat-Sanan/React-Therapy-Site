// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDozLgGhLrg5Y7CJ-W7_IoprCf_2f4LiCg",
    authDomain: "zenheal-db45b.firebaseapp.com",
    projectId: "zenheal-db45b",
    storageBucket: "zenheal-db45b.appspot.com",
    messagingSenderId: "603854866702",
    appId: "1:603854866702:web:907b30028c2267b10e6f5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)