const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../Middleware/auth.js');
const { uploadS3MovieImages } = require('../utils/fileupload.js');

// Importing Controllers
const movieController = require('../Controllers/movieController.js');

// Movie Routes
router.post(
  '/addMovie',
  uploadS3MovieImages.single('file'),
  passport.authenticate('jwt', { session: false }),
  movieController.addMovie
);
router.post(
  '/getMovies',
  passport.authenticate('jwt', { session: false }),
  movieController.getMovies
);
router.put(
  '/updateMovies',
  uploadS3MovieImages.single('file'),
  passport.authenticate('jwt', { session: false }),
  movieController.updateMovie
);
router.delete(
  '/deleteMovie',
  passport.authenticate('jwt', { session: false }),
  movieController.deleteMovie
);
router.get(
  '/getMovieById',
  passport.authenticate('jwt', { session: false }),
  movieController.getMovieById
);

module.exports = router;
