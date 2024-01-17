import express from "express";
const router = express.Router();
import passport from "passport";
import "../Middleware/auth.js";


// Importing Controllers
import * as userController from "../Controllers/userController.js";

// User Routes
router.post('/createUser', passport.authenticate('jwt', { session: false }), userController.createUser);
router.post('/login', userController.login);
router.post('/logout',passport.authenticate('jwt', { session: false }), userController.logout);

export default router;
