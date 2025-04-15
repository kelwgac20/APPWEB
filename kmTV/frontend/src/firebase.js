// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCJVYAQQXO7ITM-bqlK6-7dLryAMogpLSY",
  authDomain: "kmtv-2e9b4.firebaseapp.com",
  projectId: "kmtv-2e9b4",
  storageBucket: "kmtv-2e9b4.firebasestorage.app",
  messagingSenderId: "351079251086",
  appId: "1:351079251086:web:05718428338fd7686e5ddf",
  measurementId: "G-BMWS0RHG21"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firebase Authentication
const auth = getAuth(app);

export { auth };
