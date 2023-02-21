const cloudinary = require('../middleware/cloudinary');
const Song = require('../models/Song');
const parseFile = (...args) =>
  import('music-metadata').then((module) => module.parseFile(...args));

module.exports = {
  deleteSong: async (req, res) => {
    try {
      // Find post by id
      let song = await Song.findById({ _id: req.params.id });
      // Delete image from cloudinary
      console.log(
        song,
        req.params.id,
        await cloudinary.uploader.destroy(song.cloudinaryId, {
          resource_type: 'video',
        })
      );
      // Delete post from db
      if (song.cloudinaryImageId) {
        await cloudinary.uploader.destroy(song.cloudinaryImageId);
      }
      await Song.remove({ _id: req.params.id });
      console.log('Deleted Song');
      res.redirect('/main');
    } catch (err) {
      res.redirect('/main');
    }
  },
};
