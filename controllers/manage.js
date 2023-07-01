const cloudinary = require('../middleware/cloudinary');
const Song = require('../models/Song');
const parseFile = (...args) =>
  import('music-metadata').then((module) => module.parseFile(...args));

module.exports = {
  getMain: async (req, res) => {
    try {
      //Since we have a session each request (req) contains the logged-in users info: req.user
      //console.log(req.user) to see everything
      //Grabbing just the songs of the logged-in user
      const songs = await Song.find({ user: req.user.id });
      //Sending song data from mongodb and user data to ejs template
      res.render('manage.ejs', { songs: songs, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  deleteSong: async (req, res) => {
    try {
      const validationErrors = [];
      const validationSuccess = [];
      // Find song by id
      let song = await Song.findById({ _id: req.params.id });
      // Delete image from cloudinary
      // await cloudinary.uploader.destroy(song.cloudinaryId);
      await cloudinary.uploader
        .destroy(song.cloudinaryId, { resource_type: 'video' })
        .then((result) => console.log(result));
      // Delete song from db
      await Song.remove({ _id: req.params.id });

      console.log('Deleted Song');
      validationSuccess.push({ msg: 'Song successfully deleted' });

      if (validationErrors.length) {
        req.flash('errors', validationErrors);
        return res.redirect('/manage');
      }

      if (validationSuccess.length) {
        req.flash('success', validationSuccess);
        return res.redirect('/manage');
      }
      res.redirect('/manage');
    } catch (err) {
      console.log(err);
      res.redirect('/main');
    }
  },
};
