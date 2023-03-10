const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const profileController = require('../controllers/profile');

router.get('/', ensureAuth, profileController.getProfile);

module.exports = router;
