const prisma = require("../db");

const registrarUsuario = async (req, res) => {
  const { email, uid, rol, estado } = req.body;

  try {
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        email,
        uid,
        rol,
        estado,
      },
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("Error registrando usuario:", error);
    res.status(500).json({ error: "Error al registrar en la base de datos" });
  }
};

module.exports = {
  registrarUsuario,
};
