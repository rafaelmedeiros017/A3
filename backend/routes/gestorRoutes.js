import express from 'express';
import {
  registrarGestor,
  loginGestor,
  listarGestores,
  buscarGestorPorId,
  atualizarGestor,
  deletarGestor,
  verificarToken
} from '../controllers/gestorController.js';

const router = express.Router();

// Rotas públicas
router.post('/registrar', registrarGestor);
router.post('/login', loginGestor);

// Rotas protegidas (requerem autenticação)
router.get('/', verificarToken, listarGestores);
router.get('/:id', verificarToken, buscarGestorPorId);
router.put('/:id', verificarToken, atualizarGestor);
router.delete('/:id', verificarToken, deletarGestor);

export default router; 