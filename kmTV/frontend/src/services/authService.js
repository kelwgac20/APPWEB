// src/services/authService.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: "cliente",
      displayName: user.displayName || "",
      createdAt: serverTimestamp()
    });

    return user;
  } catch (error) {
    throw error;
  }
}
