import express from 'express';
import multer from 'multer';
import {
  getAllCars,
  addCar,
  deleteCar,
  updateCar
} from '../controllers/carController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.get('/', getAllCars);
router.post('/', upload.single('imagem'), addCar);
router.delete('/:id', deleteCar);
router.put('/:id', upload.single('imagem'), updateCar);


export default router;
