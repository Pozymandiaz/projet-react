// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWAqDO22d871uwSccXXpSJuVjvnPXhBqo",
  authDomain: "fir-m1-h3-2.firebaseapp.com",
  projectId: "fir-m1-h3-2",
  storageBucket: "fir-m1-h3-2.appspot.com",
  messagingSenderId: "282658966181",
  appId: "1:282658966181:web:fdd597fe010ef755229b4c"
}; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;