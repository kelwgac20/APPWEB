// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js';

// Middleware para verificar token JWT y autorización
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
