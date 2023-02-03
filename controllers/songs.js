const cloudinary = require('../middleware/cloudinary');
const Song = require('../models/Song');

module.exports = {
  getProfile: async (req, res) => {
    console.log(req.user);
    try {
      //Since we have a session each request (req) contains the logged-in users info: req.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user
      const songs = await Song.find({ user: req.user.id });
      //Sending post data from mongodb and user data to ejs template
      res.render('profile.ejs', { songs: songs, user: req.user });
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
      const post = await Post.findById(req.params.id);
      res.render('post.ejs', { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createSong: async (req, res) => {
    try {
      // cloudinary.v2.uploader
      //   .upload(file, { resource_type: 'video' })
      //   .then((result) => console.log(result));

      // Upload image to cloudinary
      const result = await cloudinary.v2.uploader.upload(
        req.file.path,
        { resource_type: 'video' }.then((result) => console.log(result))
      );

      //media is stored on cloudainary - the above request responds with url to media and the media id that you will need when deleting content
      await Song.create({
        title: req.body.title,
        artist: req.body.artist,
        cloudinaryId: result.public_id,
        user: req.user.id,
      });
      console.log('Song has been added!');
      res.redirect('/profile');
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
      res.redirect(`/post/${req.params.id}`);
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
      res.redirect('/profile');
    } catch (err) {
      res.redirect('/profile');
    }
  },
};
