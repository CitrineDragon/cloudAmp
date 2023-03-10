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
      // Find song by id
      let song = await Song.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(song.cloudinaryId);
      // Delete song from db
      await Song.remove({ _id: req.params.id });
      console.log('Deleted Song');
      res.redirect('/main');
    } catch (err) {
      res.redirect('/main');
    }
  },
};