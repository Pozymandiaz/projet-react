// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHQTlnuV7_aRz1VZ6BjFN1G0-HJO94u4k",
  authDomain: "eval-react.firebaseapp.com",
  databaseURL: "https://eval-react-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "eval-react",
  storageBucket: "eval-react.appspot.com",
  messagingSenderId: "842176661204",
  appId: "1:842176661204:web:df05fc2d1ef2c07a145d41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
