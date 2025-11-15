// backend/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

<<<<<<< Updated upstream
import carRoutes from './routes/carroRoutes.js';
import gestorRoutes from './routes/gestorRoutes.js';
import motoristaRoutes from './routes/motoristaRoutes.js';
import eventoRoutes from './routes/eventoRoutes.js';
import db from './config/db.js';
=======
import carRoutes from "./routes/carRoutes.js";
import roupasRoutes from "./routes/roupasRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // 👈 NOVA ROTA
import db from "./config/db.js";
>>>>>>> Stashed changes

dotenv.config();

const app = express();

// Corrige __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Pasta de uploads pública
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rotas da API
<<<<<<< Updated upstream
app.use('/api/cars', carRoutes);
app.use('/api/gestores', gestorRoutes);
app.use('/api/motoristas', motoristaRoutes);
app.use('/api/eventos', eventoRoutes);
=======
app.use("/api/cars", carRoutes);
app.use("/api/roupas", roupasRoutes);
app.use("/api/auth", authRoutes); // 👈 NOVA ROTA ADICIONADA
>>>>>>> Stashed changes

// Testa conexão com MySQL
db.connect((err) => {
    if (err) {
        console.error("❌ Erro ao conectar no MySQL:", err);
    } else {
        console.log("✅ Conectado ao MySQL");
    }
});

// Rota base
<<<<<<< Updated upstream
app.get('/', (req, res) => {
  res.send('API de Gestão de Frota está funcionando ✅');
=======
app.get("/", (req, res) => {
    res.send("API está funcionando ✅");
>>>>>>> Stashed changes
});

// Inicializa o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
<<<<<<< Updated upstream
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 Sistema de Gestão de Frota ativo`);
  console.log(`🔗 API disponível em: http://localhost:${PORT}`);
=======
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
>>>>>>> Stashed changes
});
