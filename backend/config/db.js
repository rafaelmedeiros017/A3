import { Sequelize } from "sequelize"

// Cria uma instância do Sequelize
const sequelize = new Sequelize("nome_database", "nome_usuario", "senha", {
  // nome_usuario geralmente é "root"
  host: "localhost", // Endereço do servidor
  dialect: "mysql", // Banco de dados a ser utilizado
  // port: 3306,
})

export default sequelize
