const cloudinary = require('../middleware/cloudinary');
const Song = require('../models/Song');
const parseFile = (...args) =>
  import('music-metadata').then((module) => module.parseFile(...args));

module.exports = {
  deleteSong: async (req, res) => {
    try {
      const validationErrors = [];
      const validationSuccess = [];
      // Find song by id
      let song = await Song.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(song.cloudinaryId);
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
      res.redirect('/main');
    }
  },
};
