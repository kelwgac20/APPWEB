const express = require("express");
const router = express.Router();
const { registrarUsuario } = require("../controllers/usuarios.controller");
const verificarToken = require("../middlewares/verificarToken");

router.post("/", verificarToken, registrarUsuario);

module.exports = router;
