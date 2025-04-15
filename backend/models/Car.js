import Sequelize from "sequelize"
import sequelize from "../config/db.js"

sequelize
  .authenticate()
  .then(() => console.log("Conectado ao banco de dados!"))
  .catch((err) => console.log("Erro ao conectar ao banco de dados: " + err))

const Carro = sequelize.define("carros", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  marca: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  modelo: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  ano: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  combustivel: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  km: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  preco: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  imagem: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ivaDedutivel: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
})

export default Carro
