const mongoose = require('mongoose');

const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    publishingYear: {
      type: Number,
      required: true,
    },
    poster: {
      type: String,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('movie', movieSchema);
