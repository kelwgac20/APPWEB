// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import admin from 'firebase-admin';
import authRoutes from './routes/auth.routes.js';
import iptvRoutes from './routes/iptv.routes.js'; // ✅ Importamos las rutas IPTV

// Rutas de IPTV
app.use('/api/iptv', iptvRoutes);


// Inicializar entorno (.env)
dotenv.config();

// Inicializar Firebase Admin
import serviceAccount from './firebase/firebase-admin.js';
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Inicializar Express y Prisma
const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors()); // Podés configurar dominios específicos si lo deseás
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/iptv', iptvRoutes); // ✅ Añadimos las rutas IPTV

// Ruta base
app.get('/', (req, res) => {
  res.send('🚀 Backend kmTV funcionando correctamente');
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
