import express from 'express';
import {
  criarEvento,
  listarEventos,
  buscarEventoPorId,
  atualizarEvento,
  deletarEvento,
  listarEventosPorPeriodo,
  listarEventosPorMotorista,
  listarEventosPorCarro,
  obterRelatorioUso,
  emprestarCarro,
  devolverCarro
} from '../controllers/eventoController.js';
import { verificarToken } from '../controllers/gestorController.js';

const router = express.Router();

// Todas as rotas requerem autenticação
router.use(verificarToken);

// CRUD básico de eventos
router.post('/', criarEvento);
router.get('/', listarEventos);
router.get('/:id', buscarEventoPorId);
router.put('/:id', atualizarEvento);
router.delete('/:id', deletarEvento);

// Rotas específicas para empréstimo e devolução
router.post('/emprestar', emprestarCarro);
router.post('/devolver', devolverCarro);

// Rotas de relatórios
router.get('/periodo', listarEventosPorPeriodo);
router.get('/motorista/:motoristaId', listarEventosPorMotorista);
router.get('/carro/:carroId', listarEventosPorCarro);
router.get('/relatorio/uso', obterRelatorioUso);

export default router; 