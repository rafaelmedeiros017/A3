// backend/server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import carRoutes from './routes/carRoutes.js';
import db from './config/db.js';

dotenv.config();

const app = express();

// Corrige __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Pasta de uploads pública
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/api/cars', carRoutes);

// Testa conexão com MySQL
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
  } else {
    console.log('✅ Conectado ao MySQL');
  }
});

// Rota base
app.get('/', (req, res) => {
  res.send('API está funcionando ✅');
});

// Inicializa o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
