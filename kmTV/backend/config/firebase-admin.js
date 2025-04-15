// firebase-admin.js

import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

// Ruta al archivo de clave privada (descargada desde Firebase Console)
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const firebaseAdmin = admin;
