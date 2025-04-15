import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  uploadIptvFromFile,
  uploadIptvFromUrl,
  getUserPlaylists,
  deletePlaylist
} from '../controllers/iptv.controller.js';

const router = express.Router();

// Subir lista desde archivo (ej: .m3u cargado por el usuario)
router.post('/upload/file', verifyToken, uploadIptvFromFile);

// Subir lista desde URL remota
router.post('/upload/url', verifyToken, uploadIptvFromUrl);

// Obtener listas guardadas del usuario
router.get('/my-playlists', verifyToken, getUserPlaylists);

// Eliminar una lista (opcional más adelante)
router.delete('/playlist/:id', verifyToken, deletePlaylist);

export default router;
