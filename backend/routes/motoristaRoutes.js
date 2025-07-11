import express from 'express';
import {
  criarMotorista,
  listarMotoristas,
  listarMotoristasAtivos,
  buscarMotoristaPorId,
  atualizarMotorista,
  deletarMotorista,
  alterarStatusMotorista
} from '../controllers/motoristaController.js';
import { verificarToken } from '../controllers/gestorController.js';

const router = express.Router();

// Todas as rotas requerem autenticação
router.use(verificarToken);

router.post('/', criarMotorista);
router.get('/', listarMotoristas);
router.get('/ativos', listarMotoristasAtivos);
router.get('/:id', buscarMotoristaPorId);
router.put('/:id', atualizarMotorista);
router.delete('/:id', deletarMotorista);
router.patch('/:id/status', alterarStatusMotorista);

export default router; 