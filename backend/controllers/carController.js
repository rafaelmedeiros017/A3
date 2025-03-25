import Car from '../models/Car.js';
import path from 'path';
import fs from 'fs';

// Função auxiliar para deletar imagem com verificação
const deleteImage = (imagePath) => {
  const fullPath = path.resolve('public', imagePath);
  fs.unlink(fullPath, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.warn('Imagem não encontrada para deletar:', fullPath);
      } else {
        console.error('Erro ao deletar imagem:', err);
      }
    }
  });
};

// GET /api/cars
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar carros.' });
  }
};

// POST /api/cars
export const addCar = async (req, res) => {
  try {
    const {
      marca,
      modelo,
      ano,
      combustivel,
      km,
      preco,
      ivaDedutivel
    } = req.body;

    const imagemUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newCar = new Car({
      marca,
      modelo,
      ano,
      combustivel,
      km,
      preco,
      imagem: imagemUrl,
      ivaDedutivel: ivaDedutivel === 'true' || ivaDedutivel === true
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar carro.' });
  }
};

// DELETE /api/cars/:id
export const deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ error: 'Carro não encontrado.' });
    }

    if (deletedCar.imagem) {
      deleteImage(deletedCar.imagem);
    }

    res.json({ message: 'Carro removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover carro.' });
  }
};

// PUT /api/cars/:id
export const updateCar = async (req, res) => {
  try {
    const {
      marca,
      modelo,
      ano,
      combustivel,
      km,
      preco,
      ivaDedutivel
    } = req.body;

    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Carro não encontrado.' });
    }

    car.marca = marca;
    car.modelo = modelo;
    car.ano = Number(ano);
    car.combustivel = combustivel;
    car.km = Number(km);
    car.preco = Number(preco);
    car.ivaDedutivel = ivaDedutivel === 'true' || ivaDedutivel === true;

    if (req.file) {
      if (car.imagem) {
        deleteImage(car.imagem);
      }
      car.imagem = `/uploads/${req.file.filename}`;
    }

    await car.save();
    res.json(car);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar carro.' });
  }
};
