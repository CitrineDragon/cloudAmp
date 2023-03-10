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
      res.render('main.ejs', { songs: songs, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};
