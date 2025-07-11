import db from '../config/db.js';

class Evento {
  static async criar(evento) {
    const query = 'INSERT INTO eventos (gestor_id, motorista_id, carro_id, tipo_evento, odometro, observacoes) VALUES (?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.query(query, [
        evento.gestor_id,
        evento.motorista_id,
        evento.carro_id,
        evento.tipo_evento,
        evento.odometro,
        evento.observacoes || null
      ], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async buscarPorId(id) {
    const query = `
      SELECT e.*, 
             g.nome as gestor_nome,
             m.nome as motorista_nome, m.telefone as motorista_telefone,
             c.placa, c.marca, c.modelo
      FROM eventos e
      JOIN gestores g ON e.gestor_id = g.id
      JOIN motoristas m ON e.motorista_id = m.id
      JOIN carros c ON e.carro_id = c.id
      WHERE e.id = ?
    `;
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static async listarTodos() {
    const query = `
      SELECT e.*, 
             g.nome as gestor_nome,
             m.nome as motorista_nome, m.telefone as motorista_telefone,
             c.placa, c.marca, c.modelo
      FROM eventos e
      JOIN gestores g ON e.gestor_id = g.id
      JOIN motoristas m ON e.motorista_id = m.id
      JOIN carros c ON e.carro_id = c.id
      ORDER BY e.data_hora DESC
    `;
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async listarPorPeriodo(dataInicio, dataFim) {
    const query = `
      SELECT e.*, 
             g.nome as gestor_nome,
             m.nome as motorista_nome, m.telefone as motorista_telefone,
             c.placa, c.marca, c.modelo
      FROM eventos e
      JOIN gestores g ON e.gestor_id = g.id
      JOIN motoristas m ON e.motorista_id = m.id
      JOIN carros c ON e.carro_id = c.id
      WHERE e.data_hora BETWEEN ? AND ?
      ORDER BY e.data_hora DESC
    `;
    return new Promise((resolve, reject) => {
      db.query(query, [dataInicio, dataFim], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async listarPorMotorista(motoristaId, dataInicio = null, dataFim = null) {
    let query = `
      SELECT e.*, 
             g.nome as gestor_nome,
             m.nome as motorista_nome, m.telefone as motorista_telefone,
             c.placa, c.marca, c.modelo
      FROM eventos e
      JOIN gestores g ON e.gestor_id = g.id
      JOIN motoristas m ON e.motorista_id = m.id
      JOIN carros c ON e.carro_id = c.id
      WHERE e.motorista_id = ?
    `;
    
    const params = [motoristaId];
    
    if (dataInicio && dataFim) {
      query += ' AND e.data_hora BETWEEN ? AND ?';
      params.push(dataInicio, dataFim);
    }
    
    query += ' ORDER BY e.data_hora DESC';
    
    return new Promise((resolve, reject) => {
      db.query(query, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async listarPorCarro(carroId, dataInicio = null, dataFim = null) {
    let query = `
      SELECT e.*, 
             g.nome as gestor_nome,
             m.nome as motorista_nome, m.telefone as motorista_telefone,
             c.placa, c.marca, c.modelo
      FROM eventos e
      JOIN gestores g ON e.gestor_id = g.id
      JOIN motoristas m ON e.motorista_id = m.id
      JOIN carros c ON e.carro_id = c.id
      WHERE e.carro_id = ?
    `;
    
    const params = [carroId];
    
    if (dataInicio && dataFim) {
      query += ' AND e.data_hora BETWEEN ? AND ?';
      params.push(dataInicio, dataFim);
    }
    
    query += ' ORDER BY e.data_hora DESC';
    
    return new Promise((resolve, reject) => {
      db.query(query, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async atualizar(id, evento) {
    const query = 'UPDATE eventos SET gestor_id = ?, motorista_id = ?, carro_id = ?, tipo_evento = ?, odometro = ?, observacoes = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [
        evento.gestor_id,
        evento.motorista_id,
        evento.carro_id,
        evento.tipo_evento,
        evento.odometro,
        evento.observacoes,
        id
      ], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async deletar(id) {
    const query = 'DELETE FROM eventos WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async obterRelatorioUso(dataInicio, dataFim) {
    const query = `
      SELECT 
        c.placa,
        c.marca,
        c.modelo,
        COUNT(CASE WHEN e.tipo_evento = 'saida' THEN 1 END) as total_saidas,
        COUNT(CASE WHEN e.tipo_evento = 'entrada' THEN 1 END) as total_entradas,
        SUM(CASE WHEN e.tipo_evento = 'entrada' THEN e.odometro ELSE 0 END) - 
        SUM(CASE WHEN e.tipo_evento = 'saida' THEN e.odometro ELSE 0 END) as km_percorridos
      FROM carros c
      LEFT JOIN eventos e ON c.id = e.carro_id 
        AND e.data_hora BETWEEN ? AND ?
      GROUP BY c.id, c.placa, c.marca, c.modelo
      ORDER BY km_percorridos DESC
    `;
    return new Promise((resolve, reject) => {
      db.query(query, [dataInicio, dataFim], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }
}

export default Evento; 