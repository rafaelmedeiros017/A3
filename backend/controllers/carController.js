import path from 'path';
import fs from 'fs';
import db from '../config/db.js';

// Função auxiliar para deletar imagem com verificação
const deleteImage = (imagePath) => {
  const relativePath = imagePath.replace('/uploads/', '');
  const fullPath = path.resolve('uploads', relativePath);
  fs.unlink(fullPath, (err) => {
    if (err && err.code !== 'ENOENT') {
      console.error('Erro ao deletar imagem:', err);
    }
  });
};

// Função segura para converter números
const parseNumberOrNull = (value) => {
  const num = Number(value);
  return isNaN(num) ? null : num;
};

// GET /api/cars
export const getAllCars = (req, res) => {
  db.query('SELECT * FROM cars', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar carros.' });

    const formattedResults = results.map(car => ({
      ...car,
      imagens: car.imagens ? JSON.parse(car.imagens) : [],
      informacoesAdicionais: car.informacoesAdicionais ? JSON.parse(car.informacoesAdicionais) : []
    }));

    res.json(formattedResults);
  });
};

// GET /api/cars/:id
export const getCarById = (req, res) => {
  const carId = req.params.id;

  db.query('SELECT * FROM cars WHERE id = ?', [carId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar carro.' });
    if (results.length === 0) return res.status(404).json({ error: 'Carro não encontrado.' });

    const car = results[0];
    car.imagens = car.imagens ? JSON.parse(car.imagens) : [];
    car.informacoesAdicionais = car.informacoesAdicionais ? JSON.parse(car.informacoesAdicionais) : [];

    res.json(car);
  });
};

// POST /api/cars
export const addCar = (req, res) => {
  const {
    marca, modelo, ano, combustivel, km, preco, ivaDedutivel,
    registo, lugares, segmento, potencia, origem,
    cilindrada, transmissao, cor, portas, estado, garantia,
    informacoesAdicionais
  } = req.body;

  const imagens = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
  const imagensJSON = JSON.stringify(imagens);
  const informacoesAdicionaisJSON = informacoesAdicionais
    ? JSON.stringify(JSON.parse(informacoesAdicionais))
    : JSON.stringify([]);

  const sql = `
    INSERT INTO cars (
      marca, modelo, ano, combustivel, km, preco, imagens, ivaDedutivel,
      registo, lugares, segmento, potencia, origem,
      cilindrada, transmissao, cor, portas, estado, garantia,
      informacoesAdicionais
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    marca,
    modelo,
    parseNumberOrNull(ano),
    combustivel,
    parseNumberOrNull(km),
    parseNumberOrNull(preco),
    imagensJSON,
    ivaDedutivel === 'true' || ivaDedutivel === true,
    registo,
    parseNumberOrNull(lugares),
    segmento,
    parseNumberOrNull(potencia),
    origem,
    parseNumberOrNull(cilindrada),
    transmissao,
    cor,
    parseNumberOrNull(portas),
    estado,
    garantia,
    informacoesAdicionaisJSON
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao adicionar carro.' });
    }
    res.status(201).json({ message: 'Carro adicionado com sucesso.', id: result.insertId });
  });
};

// PUT /api/cars/:id
export const updateCar = (req, res) => {
  const carId = req.params.id;
  const {
    marca, modelo, ano, combustivel, km, preco, ivaDedutivel,
    registo, lugares, segmento, potencia, origem,
    cilindrada, transmissao, cor, portas, estado, garantia,
    informacoesAdicionais
  } = req.body;

  db.query('SELECT * FROM cars WHERE id = ?', [carId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar carro.' });
    if (results.length === 0) return res.status(404).json({ error: 'Carro não encontrado.' });

    const car = results[0];
    let imagens = car.imagens;

    if (req.files && req.files.length > 0) {
      if (car.imagens) {
        try {
          const imagensAntigas = JSON.parse(car.imagens);
          imagensAntigas.forEach(img => deleteImage(img));
        } catch (e) {
          console.error('Erro ao deletar imagens antigas.');
        }
      }

      imagens = JSON.stringify(req.files.map(file => `/uploads/${file.filename}`));
    } else {
      imagens = typeof imagens === 'string' ? imagens : JSON.stringify(imagens);
    }

    const informacoesAdicionaisJSON = informacoesAdicionais
      ? JSON.stringify(JSON.parse(informacoesAdicionais))
      : JSON.stringify([]);

    const sql = `
      UPDATE cars SET
        marca = ?, modelo = ?, ano = ?, combustivel = ?, km = ?, preco = ?, imagens = ?, ivaDedutivel = ?,
        registo = ?, lugares = ?, segmento = ?, potencia = ?, origem = ?,
        cilindrada = ?, transmissao = ?, cor = ?, portas = ?, estado = ?, garantia = ?,
        informacoesAdicionais = ?
      WHERE id = ?
    `;

    const values = [
      marca,
      modelo,
      parseNumberOrNull(ano),
      combustivel,
      parseNumberOrNull(km),
      parseNumberOrNull(preco),
      imagens,
      ivaDedutivel === 'true' || ivaDedutivel === true,
      registo,
      parseNumberOrNull(lugares),
      segmento,
      parseNumberOrNull(potencia),
      origem,
      parseNumberOrNull(cilindrada),
      transmissao,
      cor,
      parseNumberOrNull(portas),
      estado,
      garantia,
      informacoesAdicionaisJSON,
      carId
    ];

    db.query(sql, values, (err) => {
      if (err) return res.status(500).json({ error: 'Erro ao atualizar carro.' });
      res.json({ message: 'Carro atualizado com sucesso.' });
    });
  });
};

// DELETE /api/cars/:id
export const deleteCar = (req, res) => {
  const carId = req.params.id;

  db.query('SELECT imagens FROM cars WHERE id = ?', [carId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar carro.' });
    if (results.length === 0) return res.status(404).json({ error: 'Carro não encontrado.' });

    const car = results[0];
    if (car.imagens) {
      try {
        const imagens = JSON.parse(car.imagens);
        imagens.forEach(img => deleteImage(img));
      } catch (e) {
        console.error('Erro ao processar imagens para deletar.');
      }
    }

    db.query('DELETE FROM cars WHERE id = ?', [carId], (err) => {
      if (err) return res.status(500).json({ error: 'Erro ao remover carro.' });
      res.json({ message: 'Carro removido com sucesso.' });
    });
  });
};
