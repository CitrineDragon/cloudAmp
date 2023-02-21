const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const deleteController = require('../controllers/delete');

router.get('/:id', ensureAuth, deleteController.deleteSong);

module.exports = router;
