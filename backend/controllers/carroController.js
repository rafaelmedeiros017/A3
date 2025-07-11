import Carro from '../models/Carro.js';

export const criarCarro = async (req, res) => {
  try {
    const { placa, marca, modelo, ano, cor, combustivel, odometro_atual } = req.body;

    // Verificar se a placa já existe
    const carroExistente = await Carro.buscarPorPlaca(placa);
    if (carroExistente) {
      return res.status(400).json({ mensagem: 'Placa já cadastrada' });
    }

    const resultado = await Carro.criar({
      placa,
      marca,
      modelo,
      ano,
      cor,
      combustivel,
      odometro_atual: odometro_atual || 0
    });

    res.status(201).json({
      mensagem: 'Carro criado com sucesso',
      id: resultado.insertId
    });
  } catch (erro) {
    console.error('Erro ao criar carro:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const listarCarros = async (req, res) => {
  try {
    const carros = await Carro.listarTodos();
    res.json(carros);
  } catch (erro) {
    console.error('Erro ao listar carros:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const listarCarrosDisponiveis = async (req, res) => {
  try {
    const carros = await Carro.listarDisponiveis();
    res.json(carros);
  } catch (erro) {
    console.error('Erro ao listar carros disponíveis:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const listarCarrosEmUso = async (req, res) => {
  try {
    const carros = await Carro.listarEmUso();
    res.json(carros);
  } catch (erro) {
    console.error('Erro ao listar carros em uso:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const buscarCarroPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const carro = await Carro.buscarPorId(id);
    
    if (!carro) {
      return res.status(404).json({ mensagem: 'Carro não encontrado' });
    }

    res.json(carro);
  } catch (erro) {
    console.error('Erro ao buscar carro:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const atualizarCarro = async (req, res) => {
  try {
    const { id } = req.params;
    const { placa, marca, modelo, ano, cor, combustivel, odometro_atual, status } = req.body;

    const carro = await Carro.buscarPorId(id);
    if (!carro) {
      return res.status(404).json({ mensagem: 'Carro não encontrado' });
    }

    await Carro.atualizar(id, {
      placa,
      marca,
      modelo,
      ano,
      cor,
      combustivel,
      odometro_atual,
      status
    });

    res.json({ mensagem: 'Carro atualizado com sucesso' });
  } catch (erro) {
    console.error('Erro ao atualizar carro:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const deletarCarro = async (req, res) => {
  try {
    const { id } = req.params;
    
    const carro = await Carro.buscarPorId(id);
    if (!carro) {
      return res.status(404).json({ mensagem: 'Carro não encontrado' });
    }

    await Carro.deletar(id);
    res.json({ mensagem: 'Carro deletado com sucesso' });
  } catch (erro) {
    console.error('Erro ao deletar carro:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const alterarStatusCarro = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, motorista_id } = req.body;

    const carro = await Carro.buscarPorId(id);
    if (!carro) {
      return res.status(404).json({ mensagem: 'Carro não encontrado' });
    }

    await Carro.alterarStatus(id, status, motorista_id);
    res.json({ mensagem: 'Status do carro alterado com sucesso' });
  } catch (erro) {
    console.error('Erro ao alterar status do carro:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const atualizarOdometro = async (req, res) => {
  try {
    const { id } = req.params;
    const { odometro } = req.body;

    const carro = await Carro.buscarPorId(id);
    if (!carro) {
      return res.status(404).json({ mensagem: 'Carro não encontrado' });
    }

    await Carro.atualizarOdometro(id, odometro);
    res.json({ mensagem: 'Odômetro atualizado com sucesso' });
  } catch (erro) {
    console.error('Erro ao atualizar odômetro:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}; 