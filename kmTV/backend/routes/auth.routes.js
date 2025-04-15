import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js';
import admin from '../firebase/firebase-admin.js';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  const { username, password, confirmPassword, email } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Las contraseñas no coinciden.' });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email: email || `${username}@kmtv.fake`,
      password,
      displayName: username,
    });

    await prisma.user.create({
      data: {
        username,
        email: email || null,
        firebaseUid: userRecord.uid,
        status: 'pendiente',
      },
    });

    res.status(201).json({ message: 'Usuario registrado. Esperando autorización del admin.' });
  } catch (error) {
    console.error('Error en el registro:', error.message);
    res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
});

// Login para usuarios autorizados
router.post('/login', async (req, res) => {
  const { firebaseUid } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { firebaseUid } });

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
    if (user.status !== 'autorizado') {
      return res.status(403).json({ message: 'Tu cuenta aún no ha sido autorizada.' });
    }

    const token = jwt.sign({ uid: user.firebaseUid }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    res.status(500).json({ message: 'Error al iniciar sesión.' });
  }
});

// Login de administrador
router.post('/admin/login', async (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_SECRET) {
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '4h' });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Contraseña de administrador incorrecta.' });
});

// Listar usuarios pendientes (protegido)
router.get('/admin/pending', verifyAdmin, async (req, res) => {
  try {
    const pendingUsers = await prisma.user.findMany({
      where: { status: 'pendiente' },
      select: { id: true, username: true, email: true },
    });

    res.json(pendingUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios pendientes.' });
  }
});

// Autorizar usuario (protegido)
router.post('/admin/authorize', verifyAdmin, async (req, res) => {
  const { userId } = req.body;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { status: 'autorizado' },
    });

    res.json({ message: 'Usuario autorizado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al autorizar usuario.' });
  }
});

// Crear usuario manualmente desde el panel admin (protegido)
router.post('/admin/create', verifyAdmin, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email: email || `${username}@kmtv.fake`,
      password,
      displayName: username,
    });

    await prisma.user.create({
      data: {
        username,
        email,
        firebaseUid: userRecord.uid,
        status: 'autorizado',
      },
    });

    res.status(201).json({ message: 'Usuario creado y autorizado por el admin.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario.' });
  }
});

export default router;
