const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión de rutas
const authRoutes = require('./routes/auth.routes');
const iptvRoutes = require('./routes/iptv.routes');
const adminRoutes = require('./routes/admin.routes'); // 👈 las nuevas

app.use('/api/auth', authRoutes);
app.use('/api/iptv', iptvRoutes);
app.use('/api/admin', adminRoutes); // 👈 admin activado

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
