// routes/carRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  getAllCars,
  addCar,
  deleteCar,
  updateCar,
  getCarById,
} from '../controllers/carController.js';

const router = express.Router();

// Padrão ESModules para pegar __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')), // 👈 agora certinho
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

// Filtro para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Arquivo inválido: apenas imagens são permitidas!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Rotas
router.post('/', upload.array('imagens', 10), addCar);
router.put('/:id', upload.array('imagens', 10), updateCar);

router.get('/', getAllCars);
router.get('/:id', getCarById);
router.delete('/:id', deleteCar);

export default router;
