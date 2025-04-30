const prisma = require('../prisma/client');

// 🔍 Obtener usuarios pendientes
exports.getPendingUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { status: 'pendiente' },
      select: { id: true, email: true, role: true, status: true }
    });
    res.json(users);
  } catch (error) {
    console.error("❌ Error al obtener usuarios pendientes:", error);
    res.status(500).json({ error: "Error al obtener usuarios." });
  }
};

// ✅ Autorizar usuario (cambiar estado a "autorizado")
exports.authorizeUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { status: 'autorizado' }
    });
    res.json({ message: "Usuario autorizado." });
  } catch (error) {
    console.error("❌ Error al autorizar usuario:", error);
    res.status(500).json({ error: "Error al autorizar usuario." });
  }
};

// ❌ Eliminar usuario
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await prisma.user.delete({ where: { id: userId } });
    res.json({ message: "Usuario eliminado." });
  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error al eliminar usuario." });
  }
};

