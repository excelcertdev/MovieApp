import express from "express";
const router = express.Router();
import passport from "passport";
import "../Middleware/auth.js";
import { uploadS3MovieImages } from '../utils/imageUpload.js';

// Importing Controllers
import * as movieController from '../Controllers/movieController.js';

// Movie Routes
router.post('/addMovie', uploadS3MovieImages.single('file'), passport.authenticate('jwt', { session: false }), movieController.addMovie);
router.post('/getMovies', passport.authenticate('jwt', { session: false }), movieController.getMovies);
router.put('/updateMovies', uploadS3MovieImages.single('file'), passport.authenticate('jwt', { session: false }), movieController.updateMovie);
router.delete('/deleteMovie', passport.authenticate('jwt', { session: false }), movieController.deleteMovie);
router.get('/getMovieById', passport.authenticate('jwt', { session: false }), movieController.getMovieById);

export default router;
