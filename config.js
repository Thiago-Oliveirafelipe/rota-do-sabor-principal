// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJFWCnfv71BIeXFAtSEfBhrHaRrGCDhFA",
  authDomain: "rota-do-sabor.firebaseapp.com",
  projectId: "rota-do-sabor",
  storageBucket: "rota-do-sabor.appspot.com",
  messagingSenderId: "348411169443",
  appId: "1:348411169443:web:ff9f24f993d29e681a4d16",
  measurementId: "G-B1QMBTXRB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);