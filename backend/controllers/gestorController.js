import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Gestor from '../models/Gestor.js';

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_aqui';

export const registrarGestor = async (req, res) => {
  try {
    const { nome, email, senha, telefone } = req.body;

    // Verificar se o email já existe
    const gestorExistente = await Gestor.buscarPorEmail(email);
    if (gestorExistente) {
      return res.status(400).json({ mensagem: 'Email já cadastrado' });
    }

    // Criptografar senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Criar gestor
    const resultado = await Gestor.criar({
      nome,
      email,
      senha: senhaCriptografada,
      telefone
    });

    res.status(201).json({
      mensagem: 'Gestor registrado com sucesso',
      id: resultado.insertId
    });
  } catch (erro) {
    console.error('Erro ao registrar gestor:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const loginGestor = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Buscar gestor por email
    const gestor = await Gestor.buscarPorEmail(email);
    if (!gestor) {
      return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, gestor.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: gestor.id, email: gestor.email, nome: gestor.nome },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      mensagem: 'Login realizado com sucesso',
      token,
      gestor: {
        id: gestor.id,
        nome: gestor.nome,
        email: gestor.email,
        telefone: gestor.telefone
      }
    });
  } catch (erro) {
    console.error('Erro ao fazer login:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const listarGestores = async (req, res) => {
  try {
    const gestores = await Gestor.listarTodos();
    res.json(gestores);
  } catch (erro) {
    console.error('Erro ao listar gestores:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const buscarGestorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const gestor = await Gestor.buscarPorId(id);
    
    if (!gestor) {
      return res.status(404).json({ mensagem: 'Gestor não encontrado' });
    }

    // Remover senha do retorno
    delete gestor.senha;
    res.json(gestor);
  } catch (erro) {
    console.error('Erro ao buscar gestor:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const atualizarGestor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;

    const gestor = await Gestor.buscarPorId(id);
    if (!gestor) {
      return res.status(404).json({ mensagem: 'Gestor não encontrado' });
    }

    await Gestor.atualizar(id, { nome, email, telefone });
    res.json({ mensagem: 'Gestor atualizado com sucesso' });
  } catch (erro) {
    console.error('Erro ao atualizar gestor:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const deletarGestor = async (req, res) => {
  try {
    const { id } = req.params;
    
    const gestor = await Gestor.buscarPorId(id);
    if (!gestor) {
      return res.status(404).json({ mensagem: 'Gestor não encontrado' });
    }

    await Gestor.deletar(id);
    res.json({ mensagem: 'Gestor deletado com sucesso' });
  } catch (erro) {
    console.error('Erro ao deletar gestor:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

// Middleware para verificar token JWT
export const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.gestor = decoded;
    next();
  } catch (erro) {
    return res.status(401).json({ mensagem: 'Token inválido' });
  }
}; 