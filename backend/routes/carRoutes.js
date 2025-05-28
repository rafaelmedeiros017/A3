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
  alugarCarro,
  devolverCarro
} from '../controllers/carController.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Apenas imagens são permitidas!'), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post('/', upload.array('imagens', 10), addCar);
router.put('/:id', upload.array('imagens', 10), updateCar);
router.get('/', getAllCars);
router.get('/:id', getCarById);
router.delete('/:id', deleteCar);
router.put('/alugar/:id', alugarCarro);
router.put('/devolver/:id', devolverCarro);

export default router;
