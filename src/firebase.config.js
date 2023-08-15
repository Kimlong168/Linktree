// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuOGJQsvE3ChTqONOxoYpUOr70Nnf_q5M",
  authDomain: "linktree-c88fd.firebaseapp.com",
  projectId: "linktree-c88fd",
  storageBucket: "linktree-c88fd.appspot.com",
  messagingSenderId: "776091145400",
  appId: "1:776091145400:web:5ba004d3c2feb931fa904d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
