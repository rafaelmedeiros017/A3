import mysql from 'mysql2';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'stand'
});

// Função para executar queries
const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) {
        console.error('❌ Erro na query:', err);
        reject(err);
      } else {
        console.log('✅ Query executada com sucesso');
        resolve(result);
      }
    });
  });
};

// Função para inicializar o banco
const initDatabase = async () => {
  try {
    console.log('🚀 Iniciando configuração do banco de dados...');
    
    // Ler o arquivo schema.sql
    const schemaPath = path.join(__dirname, 'config', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Dividir o schema em queries individuais
    const queries = schema.split(';').filter(query => query.trim());
    
    // Executar cada query
    for (const query of queries) {
      if (query.trim()) {
        await executeQuery(query);
      }
    }
    
    console.log('✅ Banco de dados configurado com sucesso!');
    console.log('📊 Tabelas criadas:');
    console.log('   - gestores');
    console.log('   - motoristas');
    console.log('   - carros');
    console.log('   - eventos');
    console.log('');
    console.log('👤 Usuário padrão criado:');
    console.log('   Email: admin@frota.com');
    console.log('   Senha: admin123');
    
  } catch (error) {
    console.error('❌ Erro ao configurar banco de dados:', error);
  } finally {
    db.end();
  }
};

// Executar inicialização
initDatabase(); 