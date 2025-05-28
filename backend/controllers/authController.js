// controllers/authController.js

import db from '../config/db.js';
import bcrypt from 'bcrypt';

// REGISTRAR USUÁRIO
export const registerUser = (req, res) => {
  const { nome, email, password } = req.body;

  if (!nome || !email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Erro ao criptografar senha.' });

    // Por padrão, todo novo usuário NÃO é admin
    const query = 'INSERT INTO users (nome, email, password, isAdmin) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, email, hashedPassword, false], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao registrar usuário.' });
      }

      res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    });
  });
};

// LOGIN DE USUÁRIO
export const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro ao buscar usuário.' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Erro ao verificar senha.' });

      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      res.status(200).json({
        message: 'Login bem-sucedido.',
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          isAdmin: !!user.isAdmin // garante booleano no front
        }
      });
    });
  });
};

// ATUALIZAR USUÁRIO
export const updateUser = (req, res) => {
  const userId = req.params.id;
  const { nome, email, password } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ message: 'Nome e email são obrigatórios.' });
  }

  const queryWithPassword = 'UPDATE users SET nome = ?, email = ?, password = ? WHERE id = ?';
  const queryWithoutPassword = 'UPDATE users SET nome = ?, email = ? WHERE id = ?';

  if (password) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Erro ao criptografar senha.' });

      db.query(queryWithPassword, [nome, email, hashedPassword, userId], (error, result) => {
        if (error) return res.status(500).json({ message: 'Erro ao atualizar usuário.' });

        res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
      });
    });
  } else {
    db.query(queryWithoutPassword, [nome, email, userId], (error, result) => {
      if (error) return res.status(500).json({ message: 'Erro ao atualizar usuário.' });

      res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
    });
  }
};

// DELETAR USUÁRIO
export const deleteUser = (req, res) => {
  const userId = req.params.id;

  db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Erro ao deletar usuário.' });

    res.status(200).json({ message: 'Usuário deletado com sucesso.' });
  });
};
