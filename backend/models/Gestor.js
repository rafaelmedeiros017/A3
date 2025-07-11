import db from '../config/db.js';

class Gestor {
  static async criar(gestor) {
    const query = 'INSERT INTO gestores (nome, email, senha, telefone) VALUES (?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.query(query, [gestor.nome, gestor.email, gestor.senha, gestor.telefone], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async buscarPorEmail(email) {
    const query = 'SELECT * FROM gestores WHERE email = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [email], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static async buscarPorId(id) {
    const query = 'SELECT * FROM gestores WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static async listarTodos() {
    const query = 'SELECT * FROM gestores ORDER BY nome';
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async atualizar(id, gestor) {
    const query = 'UPDATE gestores SET nome = ?, email = ?, telefone = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [gestor.nome, gestor.email, gestor.telefone, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async deletar(id) {
    const query = 'DELETE FROM gestores WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

export default Gestor; 