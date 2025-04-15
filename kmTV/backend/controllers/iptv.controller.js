import prisma from '../prisma/client.js';
import fs from 'fs';
import axios from 'axios';

// Subida de lista desde archivo (a implementar cuando tengamos file upload)
export const uploadIptvFromFile = async (req, res) => {
  try {
    // TODO: implementar lógica para subir y parsear archivo
    return res.json({ message: 'Función de subir archivo aún no implementada.' });
  } catch (error) {
    console.error('Error al subir archivo:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Subida de lista desde una URL remota
export const uploadIptvFromUrl = async (req, res) => {
  const { url } = req.body;
  const userId = req.userId;

  try {
    const response = await axios.get(url);
    const playlistContent = response.data;

    // Guardar en DB
    await prisma.playlist.create({
      data: {
        userId,
        name: 'Lista desde URL',
        content: playlistContent,
      },
    });

    res.status(201).json({ message: 'Lista guardada correctamente desde URL.' });
  } catch (error) {
    console.error('Error al subir lista desde URL:', error.message);
    res.status(500).json({ message: 'No se pudo cargar la lista desde la URL.' });
  }
};

// Obtener todas las listas de un usuario
export const getUserPlaylists = async (req, res) => {
  const userId = req.userId;

  try {
    const playlists = await prisma.playlist.findMany({
      where: { userId },
      select: { id: true, name: true, createdAt: true },
    });

    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener listas.' });
  }
};

// Eliminar una lista (opcional)
export const deletePlaylist = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  try {
    const playlist = await prisma.playlist.findFirst({
      where: { id, userId },
    });

    if (!playlist) {
      return res.status(404).json({ message: 'Lista no encontrada o no autorizada.' });
    }

    await prisma.playlist.delete({ where: { id } });

    res.json({ message: 'Lista eliminada correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la lista.' });
  }
};
