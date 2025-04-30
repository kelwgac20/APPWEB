// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js';

// Middleware para verificar token JWT y autorización de usuario
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado o inválido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado en la base de datos.' });
    }

    if (user.status !== 'autorizado') {
      return res.status(403).json({ message: 'Usuario aún no autorizado por el administrador.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error en el middleware de autenticación:', error.message);
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};

// Middleware para verificar si el usuario es admin
export const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado o inválido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Token especial de admin (cuando se hace login con /admin/login)
    if (decoded.admin) {
      return next();
    }

    // O buscar el rol del usuario real
    const user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error en el middleware de administrador:', error.message);
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};
