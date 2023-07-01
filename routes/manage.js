const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const manageController = require('../controllers/manage');

router.get('/', ensureAuth, manageController.getMain);
router.get('/:id', ensureAuth, manageController.deleteSong);

module.exports = router;
