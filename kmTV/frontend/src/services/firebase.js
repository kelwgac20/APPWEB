// src/services/firebase.js

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ajusta si tienes firebase.js en otra ubicación

export const getUserRole = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().role;
    } else {
      console.warn("No existe documento para el usuario:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error obteniendo rol del usuario:", error);
    return null;
  }
};
