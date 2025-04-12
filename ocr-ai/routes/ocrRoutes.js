import express from 'express';
import { fileupload, processImage, processReq} from '../controllers/ocrController.js';
import multer from 'multer';
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/process',upload.single("image"),processImage);
router.post('/depression',processReq);
router.post('/fileupload', upload.single('file'), fileupload);

export default router;