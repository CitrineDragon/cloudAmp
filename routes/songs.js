const express = require('express');
const router = express.Router();
const songController = require('../controllers/songs');
const { ensureAuth } = require('../middleware/auth');

//Post Routes
//Since linked from server js treat each path as:
//post/:id, post/createPost, post/likePost/:id, post/deletePost/:id
router.get('/:id', ensureAuth, songController.getSong);

//Enables user to like post. In controller, uses POST model to update likes by 1
router.put('/likeSong/:id', songController.likeSong);

//Enables user to delete post. In controller, uses POST model to delete post from MongoDB collection
router.delete('/deleteSong/:id', songController.deleteSong);

module.exports = router;
