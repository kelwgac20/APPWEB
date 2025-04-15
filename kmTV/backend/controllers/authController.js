// backend/controllers/authController.js

const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Carga la clave secreta desde .env
const JWT_SECRET = process.env.JWT_SECRET || "claveSuperSecreta123";

// Crear usuario en Firebase y marcarlo como "pendiente" en PostgreSQL
exports.register = async (req, res) => {
  const { username, password, confirmPassword, email } = req.body;

  if (!username || !password || password !== confirmPassword) {
    return res.status(400).json({ message: "Datos inválidos o contraseñas no coinciden." });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email: email || `${username}@kmtv.com`,
      password,
      displayName: username,
    });

    await prisma.user.create({
      data: {
        username,
        firebase_uid: userRecord.uid,
        status: "PENDING",
        email: email || null,
      },
    });

    return res.status(201).json({ message: "Usuario registrado. Esperando aprobación." });
  } catch (err) {
    return res.status(500).json({ message: "Error al registrar usuario.", error: err.message });
  }
};

// Iniciar sesión y emitir token solo si el usuario está autorizado
exports.login = async (req, res) => {
  const { firebaseToken } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(firebaseToken);
    const user = await prisma.user.findUnique({ where: { firebase_uid: decoded.uid } });

    if (!user || user.status !== "AUTHORIZED") {
      return res.status(403).json({ message: "Usuario no autorizado." });
    }

    const token = jwt.sign({ uid: user.firebase_uid }, JWT_SECRET, { expiresIn: "7d" });
    return res.status(200).json({ token, user });
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o usuario no autorizado." });
  }
};

// Ver todos los usuarios pendientes (solo para admin)
exports.getPendingUsers = async (req, res) => {
  const pendingUsers = await prisma.user.findMany({ where: { status: "PENDING" } });
  res.json(pendingUsers);
};

// Autorizar usuario
exports.approveUser = async (req, res) => {
  const { uid } = req.body;
  try {
    await prisma.user.update({
      where: { firebase_uid: uid },
      data: { status: "AUTHORIZED" },
    });
    res.json({ message: "Usuario autorizado." });
  } catch (err) {
    res.status(500).json({ message: "Error al autorizar usuario.", error: err.message });
  }
};

// Crear usuario desde el panel admin directamente
exports.createUserFromAdmin = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email: email || `${username}@kmtv.com`,
      password,
      displayName: username,
    });

    await prisma.user.create({
      data: {
        username,
        firebase_uid: userRecord.uid,
        status: "AUTHORIZED",
        email: email || null,
      },
    });

    res.status(201).json({ message: "Usuario creado y autorizado desde panel admin." });
  } catch (err) {
    res.status(500).json({ message: "Error creando usuario desde admin.", error: err.message });
  }
};
