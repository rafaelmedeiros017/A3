import express from 'express';
import {
  criarCarro,
  listarCarros,
  listarCarrosDisponiveis,
  listarCarrosEmUso,
  buscarCarroPorId,
  atualizarCarro,
  deletarCarro,
  alterarStatusCarro,
  atualizarOdometro
} from '../controllers/carroController.js';
import { verificarToken } from '../controllers/gestorController.js';

const router = express.Router();

// Todas as rotas requerem autenticação
router.use(verificarToken);

router.post('/', criarCarro);
router.get('/', listarCarros);
router.get('/disponiveis', listarCarrosDisponiveis);
router.get('/em-uso', listarCarrosEmUso);
router.get('/:id', buscarCarroPorId);
router.put('/:id', atualizarCarro);
router.delete('/:id', deletarCarro);
router.patch('/:id/status', alterarStatusCarro);
router.patch('/:id/odometro', atualizarOdometro);

export default router; 