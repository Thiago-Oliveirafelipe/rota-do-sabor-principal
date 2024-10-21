// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Importando o Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJFWCnfv71BIeXFAtSEfBhrHaRrGCDhFA",
  authDomain: "rota-do-sabor.firebaseapp.com",
  projectId: "rota-do-sabor",
  storageBucket: "gs://rota-do-sabor.appspot.com",
  messagingSenderId: "348411169443",
  appId: "1:348411169443:web:ff9f24f993d29e681a4d16",
  measurementId: "G-B1QMBTXRB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Inicializando a autenticação
export const storage = getStorage(app); // Inicializando o storage do Firebase