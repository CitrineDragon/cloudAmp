const cloudinary = require('../middleware/cloudinary');
const Song = require('../models/Song');
const parseFile = (...args) =>
  import('music-metadata').then((module) => module.parseFile(...args));
// const Upload = require('../models/Upload');

module.exports = {
  getUpload: async (req, res) => {
    res.render('upload', { user: req.user });
  },
  createSong: async (req, res) => {
    let picUpload = {};
    try {
      // Upload Audio to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'video',
      });
      const metadata = await parseFile(req.file.path);
      if (metadata.common.picture) {
        const picture = metadata.common.picture[0];
        picUpload = await cloudinary.uploader.upload(
          `data:${picture.format};base64,${picture.data.toString('base64')}`,
          {
            transformation: [{ width: 50, crop: 'scale' }],
          }
        );
        console.log(picture, picUpload);
      }
      console.log(metadata);

      await Song.create({
        title: metadata.common.title || req.body.title,
        artist: metadata.common.artist || req.body.artist,
        album: metadata.common.album || 'unknown',
        duration: metadata.format.duration,
        songURL: result.secure_url,
        imageURL: picUpload.secure_url,
        cloudinaryId: result.public_id,
        cloudinaryImageId: picUpload.public_id,
        user: req.user.id,
      });
      console.log('Song has been added!');
      res.redirect('/upload');
    } catch (err) {
      console.log(err);
    }
  },
};
