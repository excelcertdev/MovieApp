import express from "express";
const router = express.Router();
import passport from "passport";
import "../Middleware/passport.js";
import { uploadS3MovieImages } from '../utils/imageUpload.js';

// Importing Controllers
import * as userController from "../Controllers/userController.js";
import * as movieController from '../Controllers/movieController.js';

// User Routes
router.post('/api/createUser', userController.createUser);
router.post('/api/login', userController.login);

// Movie Routes
router.post('/api/addMovie', uploadS3MovieImages.single('file'), passport.authenticate('jwt', { session: false }), movieController.addMovie);
router.get('/api/getMovies', passport.authenticate('jwt', { session: false }), movieController.getMovies);
router.put('/api/updateMovies', uploadS3MovieImages.single('file'), passport.authenticate('jwt', { session: false }), movieController.updateMovie);
router.delete('/api/deleteMovie', passport.authenticate('jwt', { session: false }), movieController.deleteMovie);
router.get('/api/getMovieById', passport.authenticate('jwt', { session: false }), movieController.getMovieById);

export default router;
