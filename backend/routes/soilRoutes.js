const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const soilController = require('../controllers/soilController');
const authMiddleware = require('../middlewares/authMiddleware'); // optional: require login for upload

// storage to backend/uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.random().toString(36).slice(2,8)}${ext}`;
    cb(null, name);
  }
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed'), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// POST /api/soil/upload
router.post('/upload', /*authMiddleware,*/ upload.single('image'), soilController.uploadImage);

module.exports = router;
