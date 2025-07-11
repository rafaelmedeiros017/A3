import Evento from '../models/Evento.js';
import Carro from '../models/Carro.js';
import Motorista from '../models/Motorista.js';

export const criarEvento = async (req, res) => {
  try {
    const { gestor_id, motorista_id, carro_id, tipo_evento, odometro, observacoes } = req.body;

    // Verificar se o carro existe
    const carro = await Carro.buscarPorId(carro_id);
    if (!carro) {
      return res.status(404).json({ mensagem: 'Carro não encontrado' });
    }

    // Verificar se o motorista existe
    const motorista = await Motorista.buscarPorId(motorista_id);
    if (!motorista) {
      return res.status(404).json({ mensagem: 'Motorista não encontrado' });
    }

    // Criar o evento
    const resultado = await Evento.criar({
      gestor_id,
      motorista_id,
      carro_id,
      tipo_evento,
      odometro,
      observacoes
    });

    // Atualizar status do carro
    if (tipo_evento === 'saida') {
      await Carro.alterarStatus(carro_id, 'em_uso', motorista_id);
    } else if (tipo_evento === 'entrada') {
      await Carro.alterarStatus(carro_id, 'disponivel', null);
      await Carro.atualizarOdometro(carro_id, odometro);
    }

    res.status(201).json({
      mensagem: 'Evento criado com sucesso',
      id: resultado.insertId
    });
  } catch (erro) {
    console.error('Erro ao criar evento:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const listarEventos = async (req, res) => {
  try {
    const eventos = await Evento.listarTodos();
    res.json(eventos);
  } catch (erro) {
    console.error('Erro ao listar eventos:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const buscarEventoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await Evento.buscarPorId(id);
    
    if (!evento) {
      return res.status(404).json({ mensagem: 'Evento não encontrado' });
    }

    res.json(evento);
  } catch (erro) {
    console.error('Erro ao buscar evento:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const atualizarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const { gestor_id, motorista_id, carro_id, tipo_evento, odometro, observacoes } = req.body;

    const evento = await Evento.buscarPorId(id);
    if (!evento) {
      return res.status(404).json({ mensagem: 'Evento não encontrado' });
    }

    await Evento.atualizar(id, {
      gestor_id,
      motorista_id,
      carro_id,
      tipo_evento,
      odometro,
      observacoes
    });

    res.json({ mensagem: 'Evento atualizado com sucesso' });
  } catch (erro) {
    console.error('Erro ao atualizar evento:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const deletarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    
    const evento = await Evento.buscarPorId(id);
    if (!evento) {
      return res.status(404).json({ mensagem: 'Evento não encontrado' });
    }

    await Evento.deletar(id);
    res.json({ mensagem: 'Evento deletado com sucesso' });
  } catch (erro) {
    console.error('Erro ao deletar evento:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const listarEventosPorPeriodo = async (req, res) => {
  try {
    const { dataInicio, dataFim } = req.query;
    
    if (!dataInicio || !dataFim) {
      return res.status(400).json({ mensagem: 'Data de início e fim são obrigatórias' });
    }

    const eventos = await Evento.listarPorPeriodo(dataInicio, dataFim);
    res.json(eventos);
  } catch (erro) {
    console.error('Erro ao listar eventos por período:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const listarEventosPorMotorista = async (req, res) => {
  try {
    const { motoristaId } = req.params;
    const { dataInicio, dataFim } = req.query;

    const eventos = await Evento.listarPorMotorista(motoristaId, dataInicio, dataFim);
    res.json(eventos);
  } catch (erro) {
    console.error('Erro ao listar eventos por motorista:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const listarEventosPorCarro = async (req, res) => {
  try {
    const { carroId } = req.params;
    const { dataInicio, dataFim } = req.query;

    const eventos = await Evento.listarPorCarro(carroId, dataInicio, dataFim);
    res.json(eventos);
  } catch (erro) {
    console.error('Erro ao listar eventos por carro:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export const obterRelatorioUso = async (req, res) => {
  try {
    const { dataInicio, dataFim } = req.query;
    
    if (!dataInicio || !dataFim) {
      return res.status(400).json({ mensagem: 'Data de início e fim são obrigatórias' });
    }

    const relatorio = await Evento.obterRelatorioUso(dataInicio, dataFim);
    res.json(relatorio);
  } catch (erro) {
    console.error('Erro ao obter relatório de uso:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

// Função para emprestar carro (criar evento de saída)
export const emprestarCarro = async (req, res) => {
  try {
    const { gestor_id, motorista_id, carro_id, odometro, observacoes } = req.body;

    // Verificar se o carro está disponível
    const carro = await Carro.buscarPorId(carro_id);
    if (!carro) {
      return res.status(404).json({ mensagem: 'Carro não encontrado' });
    }

    if (carro.status !== 'disponivel') {
      return res.status(400).json({ mensagem: 'Carro não está disponível para empréstimo' });
    }

    // Criar evento de saída
    const resultado = await Evento.criar({
      gestor_id,
      motorista_id,
      carro_id,
      tipo_evento: 'saida',
      odometro,
      observacoes
    });

    // Atualizar status do carro
    await Carro.alterarStatus(carro_id, 'em_uso', motorista_id);

    res.status(201).json({
      mensagem: 'Carro emprestado com sucesso',
      id: resultado.insertId
    });
  } catch (erro) {
    console.error('Erro ao emprestar carro:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

// Função para devolver carro (criar evento de entrada)
export const devolverCarro = async (req, res) => {
  try {
    const { gestor_id, motorista_id, carro_id, odometro, observacoes } = req.body;

    // Verificar se o carro está em uso
    const carro = await Carro.buscarPorId(carro_id);
    if (!carro) {
      return res.status(404).json({ mensagem: 'Carro não encontrado' });
    }

    if (carro.status !== 'em_uso') {
      return res.status(400).json({ mensagem: 'Carro não está em uso' });
    }

    // Criar evento de entrada
    const resultado = await Evento.criar({
      gestor_id,
      motorista_id,
      carro_id,
      tipo_evento: 'entrada',
      odometro,
      observacoes
    });

    // Atualizar status do carro e odômetro
    await Carro.alterarStatus(carro_id, 'disponivel', null);
    await Carro.atualizarOdometro(carro_id, odometro);

    res.status(201).json({
      mensagem: 'Carro devolvido com sucesso',
      id: resultado.insertId
    });
  } catch (erro) {
    console.error('Erro ao devolver carro:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}; 