// backend/server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import carRoutes from './routes/carRoutes.js';

// Configura as variáveis de ambiente
dotenv.config();

// Conecta ao MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//uploads
app.use('/uploads', express.static('uploads'));

// Rotas
app.use('/api/cars', carRoutes);

// Inicializa o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('API está funcionando ✅');
});

