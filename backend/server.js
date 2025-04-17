// backend/server.js

// Provavelmente vai ser necessário mudar o .env para rodar o Sequelize

import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectSQL from "./config/db.js"
import carRoutes from "./routes/carRoutes.js"

// Configura as variáveis de ambiente
dotenv.config()

// Conecta ao Sequelize
connectSQL()

// Valida a conexão
connectSQL
  .authenticate()
  .then(() => console.log("Conectado ao banco de dados!"))
  .catch((err) => console.log("Erro ao conectar ao banco de dados: " + err))

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

//uploads
app.use("/uploads", express.static("uploads"))

// Rotas
app.use("/api/cars", carRoutes)

// Inicializa o servidor
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
})

app.get("/", (req, res) => {
  res.send("API está funcionando ✅")
})
