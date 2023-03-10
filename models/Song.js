const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: false,
  },
  artist: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: false,
  },
  songURL: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: false,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
  cloudinaryImageId: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//MongoDB Collection named here - will give lowercase plural of name
module.exports = mongoose.model('Song', SongSchema);
