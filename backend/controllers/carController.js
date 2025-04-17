/*
As funções que usavam metodos do mongoDB estão somente comentadas para facilitar a comparação compreensão.
Se tudo estiver funcionando, mude os nomes das funções "Sequelize" para o nome original
  e mude o import no arquivo carRoutes.js.

Nota: Não sei se os console.logs são necessários, então deixei eles por precaução.
*/

import Car from "../models/Car.js"
import path from "path"
import fs from "fs"

// Função auxiliar para deletar imagem com verificação
const deleteImage = (imagePath) => {
  const fullPath = path.resolve("public", imagePath)
  fs.unlink(fullPath, (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.warn("Imagem não encontrada para deletar:", fullPath)
      } else {
        console.error("Erro ao deletar imagem:", err)
      }
    }
  })
}

// // GET /api/cars
// export const getAllCars = async (req, res) => {
//   try {
//     const cars = await Car.find()
//     res.json(cars)
//   } catch (err) {
//     res.status(500).json({ error: "Erro ao buscar carros." })
//   }
// }

// GET com Sequelize:
export async function getAllCarsSequelize(req, res) {
  Car.findAll()

    .then((cars) => {
      res.json(cars)
    })
    .catch((error) => {
      console.error("Erro ao buscar carros: ", error)
      res.status(500).json({ error: "Erro ao buscar carros." })
    })
}

// // POST /api/cars
// export const addCar = async (req, res) => {
//   try {
//     const { marca, modelo, ano, combustivel, km, preco, ivaDedutivel } =
//       req.body

//     const imagemUrl = req.file ? `/uploads/${req.file.filename}` : ""

//     const newCar = new Car({
//       marca,
//       modelo,
//       ano,
//       combustivel,
//       km,
//       preco,
//       imagem: imagemUrl,
//       ivaDedutivel: ivaDedutivel === "true" || ivaDedutivel === true,
//     })

//     await newCar.save()
//     res.status(201).json(newCar)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ error: "Erro ao adicionar carro." })
//   }
// }

// POST com Sequelize:
export async function addCarSequelize(req, res) {
  try {
    const { marca, modelo, ano, combustivel, km, preco, ivaDedutivel } =
      req.body

    const imagemUrl = req.file ? `/uploads/${req.file.filename}` : ""

    ivaDedutivel = ivaDedutivel === "true" || ivaDedutivel === true

    await Car.create({
      marca: marca,
      modelo: modelo,
      ano: ano,
      combustivel: combustivel,
      km: km,
      preco: preco,
      imagem: imagemUrl,
      ivaDedutivel: ivaDedutivel,
    })
    // Model.create é um método que istancia E salva um novo objeto no banco.

    res.status(201).json(newCar)
  } catch (error) {
    console.error("Erro ao adicionar carro:", error)
    res.status(500).json({ error: "Erro ao adicionar carro." })
  }
}

// // DELETE /api/cars/:id
// export const deleteCar = async (req, res) => {
//   try {
//     const deletedCar = await Car.findByIdAndDelete(req.params.id)
//     if (!deletedCar) {
//       return res.status(404).json({ error: "Carro não encontrado." })
//     }

//     if (deletedCar.imagem) {
//       deleteImage(deletedCar.imagem)
//     }

//     res.json({ message: "Carro removido com sucesso." })
//   } catch (err) {
//     res.status(500).json({ error: "Erro ao remover carro." })
//   }
// }

// DELETE com Sequelize:
export async function deleteCarSequelize(req, res) {
  try {
    const car = await Car.findByPk(req.params.id) // Pk significa Primary Key

    if (!car) return res.status(404).json({ error: "Carro não encontrado." })

    car.destroy()

    if (car.imagem) deleteImage(deletedCar.imagem)
  } catch (error) {
    console.error("Erro ao deletar carro: " + error)
    res.status(500).json({ error: "Erro ao deletar carro." })
  }
}

// // PUT /api/cars/:id
// export const updateCar = async (req, res) => {
//   try {
//     const { marca, modelo, ano, combustivel, km, preco, ivaDedutivel } =
//       req.body

//     const car = await Car.findById(req.params.id)
//     if (!car) {
//       return res.status(404).json({ error: "Carro não encontrado." })
//     }

//     car.marca = marca
//     car.modelo = modelo
//     car.ano = Number(ano)
//     car.combustivel = combustivel
//     car.km = Number(km)
//     car.preco = Number(preco)
//     car.ivaDedutivel = ivaDedutivel === "true" || ivaDedutivel === true

//     if (req.file) {
//       if (car.imagem) {
//         deleteImage(car.imagem)
//       }
//       car.imagem = `/uploads/${req.file.filename}`
//     }

//     await car.save()
//     res.json(car)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ error: "Erro ao atualizar carro." })
//   }
// }

// PUT com Sequelize:
export async function updateCarSequelize(req, res) {
  try {
    const { marca, modelo, ano, combustivel, km, preco, ivaDedutivel } =
      req.body

    const car = await Car.findByPk(req.params.id)
    if (!car) {
      return res.status(404).json({ error: "Carro não encontrado." })
    }

    car.marca = marca
    car.modelo = modelo
    car.ano = Number(ano)
    car.combustivel = combustivel
    car.km = Number(km)
    car.preco = Number(preco)
    car.ivaDedutivel = ivaDedutivel === "true" || ivaDedutivel === true

    if (req.file) {
      if (car.imagem) {
        deleteImage(car.imagem)
      }
      car.imagem = `/uploads/${req.file.filename}`
    }

    await car.save()
  } catch (error) {
    console.error("Erro ao atualizar carro:", error)
    res.status(500).json({ error: "Erro ao atualizar carro." })
  }
}
