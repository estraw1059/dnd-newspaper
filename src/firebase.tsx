// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwmo6c-Ves3oyasu4_sDfDqwSgCjJwbag",
  authDomain: "waterdeep-4bf5f.firebaseapp.com",
  projectId: "waterdeep-4bf5f",
  storageBucket: "waterdeep-4bf5f.appspot.com",
  messagingSenderId: "624056081844",
  appId: "1:624056081844:web:0e094880c744c30f82e6e1",
  measurementId: "G-3GG1LSLS3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);