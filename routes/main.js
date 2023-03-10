const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const songController = require('../controllers/songs');

//Main Routes
router.get('/', homeController.getIndex);
router.get('/main', ensureAuth, songController.getMain);

//Routes for user login/signup
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

module.exports = router;
