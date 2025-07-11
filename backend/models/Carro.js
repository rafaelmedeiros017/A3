import db from '../config/db.js';

class Carro {
  static async criar(carro) {
    const query = 'INSERT INTO carros (placa, marca, modelo, ano, cor, combustivel, odometro_atual) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.query(query, [
        carro.placa, 
        carro.marca, 
        carro.modelo, 
        carro.ano, 
        carro.cor, 
        carro.combustivel, 
        carro.odometro_atual || 0
      ], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async buscarPorId(id) {
    const query = `
      SELECT c.*, m.nome as motorista_nome, m.telefone as motorista_telefone 
      FROM carros c 
      LEFT JOIN motoristas m ON c.motorista_atual = m.id 
      WHERE c.id = ?
    `;
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static async buscarPorPlaca(placa) {
    const query = 'SELECT * FROM carros WHERE placa = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [placa], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static async listarTodos() {
    const query = `
      SELECT c.*, m.nome as motorista_nome, m.telefone as motorista_telefone 
      FROM carros c 
      LEFT JOIN motoristas m ON c.motorista_atual = m.id 
      ORDER BY c.marca, c.modelo
    `;
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async listarDisponiveis() {
    const query = 'SELECT * FROM carros WHERE status = "disponivel" ORDER BY marca, modelo';
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async listarEmUso() {
    const query = `
      SELECT c.*, m.nome as motorista_nome, m.telefone as motorista_telefone 
      FROM carros c 
      LEFT JOIN motoristas m ON c.motorista_atual = m.id 
      WHERE c.status = "em_uso" 
      ORDER BY c.marca, c.modelo
    `;
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async atualizar(id, carro) {
    const query = 'UPDATE carros SET placa = ?, marca = ?, modelo = ?, ano = ?, cor = ?, combustivel = ?, odometro_atual = ?, status = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [
        carro.placa, 
        carro.marca, 
        carro.modelo, 
        carro.ano, 
        carro.cor, 
        carro.combustivel, 
        carro.odometro_atual,
        carro.status,
        id
      ], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async deletar(id) {
    const query = 'DELETE FROM carros WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async alterarStatus(id, status, motoristaId = null) {
    const query = 'UPDATE carros SET status = ?, motorista_atual = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [status, motoristaId, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async atualizarOdometro(id, odometro) {
    const query = 'UPDATE carros SET odometro_atual = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [odometro, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

export default Carro; 