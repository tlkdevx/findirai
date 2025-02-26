import { Router } from 'express';
import multer from 'multer';
import path from 'path';

const router = Router();
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  res.json({ fileName: req.file.filename, filePath: `/uploads/${req.file.filename}` });
});

export default router;