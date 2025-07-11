import db from '../config/db.js';

class Motorista {
  static async criar(motorista) {
    const query = 'INSERT INTO motoristas (nome, cpf, telefone, email, cnh, categoria_cnh) VALUES (?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.query(query, [
        motorista.nome, 
        motorista.cpf, 
        motorista.telefone, 
        motorista.email, 
        motorista.cnh, 
        motorista.categoria_cnh
      ], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async buscarPorId(id) {
    const query = 'SELECT * FROM motoristas WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static async buscarPorCpf(cpf) {
    const query = 'SELECT * FROM motoristas WHERE cpf = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [cpf], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static async listarTodos() {
    const query = 'SELECT * FROM motoristas ORDER BY nome';
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async listarAtivos() {
    const query = 'SELECT * FROM motoristas WHERE status = "ativo" ORDER BY nome';
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async atualizar(id, motorista) {
    const query = 'UPDATE motoristas SET nome = ?, cpf = ?, telefone = ?, email = ?, cnh = ?, categoria_cnh = ?, status = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [
        motorista.nome, 
        motorista.cpf, 
        motorista.telefone, 
        motorista.email, 
        motorista.cnh, 
        motorista.categoria_cnh,
        motorista.status,
        id
      ], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async deletar(id) {
    const query = 'DELETE FROM motoristas WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async alterarStatus(id, status) {
    const query = 'UPDATE motoristas SET status = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [status, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

export default Motorista; 