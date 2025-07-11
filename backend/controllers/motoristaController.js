import Motorista from '../models/Motorista.js';

export const criarMotorista = async (req, res) => {
  try {
    const { nome, cpf, telefone, email, cnh, categoria_cnh } = req.body;

    // Verificar se o CPF já existe
    const motoristaExistente = await Motorista.buscarPorCpf(cpf);
    if (motoristaExistente) {
      return res.status(400).json({ mensagem: 'CPF já cadastrado' });
    }

    const resultado = await Motorista.criar({
      nome,
      cpf,
      telefone,
      email,
      cnh,
      categoria_cnh
    });

    res.status(201).json({
      mensagem: 'Motorista criado com sucesso',
      id: resultado.insertId
    });
  } catch (erro) {
    console.error('Erro ao criar motorista:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const listarMotoristas = async (req, res) => {
  try {
    const motoristas = await Motorista.listarTodos();
    res.json(motoristas);
  } catch (erro) {
    console.error('Erro ao listar motoristas:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const listarMotoristasAtivos = async (req, res) => {
  try {
    const motoristas = await Motorista.listarAtivos();
    res.json(motoristas);
  } catch (erro) {
    console.error('Erro ao listar motoristas ativos:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const buscarMotoristaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const motorista = await Motorista.buscarPorId(id);
    
    if (!motorista) {
      return res.status(404).json({ mensagem: 'Motorista não encontrado' });
    }

    res.json(motorista);
  } catch (erro) {
    console.error('Erro ao buscar motorista:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const atualizarMotorista = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cpf, telefone, email, cnh, categoria_cnh, status } = req.body;

    const motorista = await Motorista.buscarPorId(id);
    if (!motorista) {
      return res.status(404).json({ mensagem: 'Motorista não encontrado' });
    }

    await Motorista.atualizar(id, {
      nome,
      cpf,
      telefone,
      email,
      cnh,
      categoria_cnh,
      status
    });

    res.json({ mensagem: 'Motorista atualizado com sucesso' });
  } catch (erro) {
    console.error('Erro ao atualizar motorista:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const deletarMotorista = async (req, res) => {
  try {
    const { id } = req.params;
    
    const motorista = await Motorista.buscarPorId(id);
    if (!motorista) {
      return res.status(404).json({ mensagem: 'Motorista não encontrado' });
    }

    await Motorista.deletar(id);
    res.json({ mensagem: 'Motorista deletado com sucesso' });
  } catch (erro) {
    console.error('Erro ao deletar motorista:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const alterarStatusMotorista = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const motorista = await Motorista.buscarPorId(id);
    if (!motorista) {
      return res.status(404).json({ mensagem: 'Motorista não encontrado' });
    }

    await Motorista.alterarStatus(id, status);
    res.json({ mensagem: 'Status do motorista alterado com sucesso' });
  } catch (erro) {
    console.error('Erro ao alterar status do motorista:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}; 