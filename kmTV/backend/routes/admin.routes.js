const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyToken, checkRole } = require('../middleware/auth');

// 🛡️ Todas protegidas por token + rol "admin"
router.get('/usuarios-pendientes', verifyToken, checkRole('admin'), adminController.getPendingUsers);
router.put('/autorizar/:userId', verifyToken, checkRole('admin'), adminController.authorizeUser);
router.delete('/eliminar/:userId', verifyToken, checkRole('admin'), adminController.deleteUser);

module.exports = router;
