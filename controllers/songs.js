const cloudinary = require('../middleware/cloudinary');
const Song = require('../models/Song');
const parseFile = (...args) =>
  import('music-metadata').then((module) => module.parseFile(...args));

module.exports = {
  getProfile: async (req, res) => {
    console.log(req.user);
    try {
      //Since we have a session each request (req) contains the logged-in users info: req.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user
      const songs = await Song.find({ user: req.user.id });
      //Sending post data from mongodb and user data to ejs template
      res.render('main.ejs', { songs: songs, user: req.user });
      console.log(songs);
    } catch (err) {
      console.log(err);
    }
  },
  getSong: async (req, res) => {
    try {
      //id parameter comes from the post routes
      //router.get("/:id", ensureAuth, postsController.getPost);
      //http://localhost:2121/post/631a7f59a3e56acfc7da286f
      //id === 631a7f59a3e56acfc7da286f
      const song = await Song.findById(req.params.id);
      res.render('songs.ejs', { song: song, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  likeSong: async (req, res) => {
    try {
      await Song.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log('Likes +1');
      res.redirect(`/song/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteSong: async (req, res) => {
    try {
      // Find post by id
      let song = await Song.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(song.cloudinaryId);
      // Delete post from db
      await Song.remove({ _id: req.params.id });
      console.log('Deleted Song');
      res.redirect('/main');
    } catch (err) {
      res.redirect('/main');
    }
  },
};
