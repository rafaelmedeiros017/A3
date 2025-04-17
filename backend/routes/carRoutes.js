import express from "express"
import multer from "multer"
import {
  getAllCarsSequelize,
  addCarSequelize,
  deleteCarSequelize,
  updateCarSequelize,
} from "../controllers/carController.js"

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
})
const upload = multer({ storage })

router.get("/", getAllCarsSequelize)
router.post("/", upload.single("imagem"), addCarSequelize)
router.delete("/:id", deleteCarSequelize)
router.put("/:id", upload.single("imagem"), updateCarSequelize)

export default router
