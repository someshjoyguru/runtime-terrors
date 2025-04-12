import express from 'express';
import { processImage, processReq} from '../controllers/ocrController.js';
import upload from '../middleware/multer.js';
const router = express.Router();

router.post('/process',upload.single("image"),processImage);
router.post('/depression',processReq);

export default router;