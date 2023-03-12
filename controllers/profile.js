const cloudinary = require('../middleware/cloudinary');
const Song = require('../models/Song');
const parseFile = (...args) =>
  import('music-metadata').then((module) => module.parseFile(...args));

module.exports = {
  getProfile: async (req, res) => {
    // console.log(req.user);
    try {
      res.render('profile.ejs', { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};
