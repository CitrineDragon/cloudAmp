const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const songController = require('../controllers/songs');

// router.get('/:id', ensureAuth, songController.getSong);
// router.put('/likeSong/:id', songController.likeSong);
// router.delete('/deleteSong/:id', songController.deleteSong);

module.exports = router;
