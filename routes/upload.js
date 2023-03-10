const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const upload = require('../middleware/multer');
const uploadController = require('../controllers/upload');

router.get('/', ensureAuth, uploadController.getUpload);
router.post('/createSong', upload.single('file'), uploadController.createSong);

module.exports = router;
