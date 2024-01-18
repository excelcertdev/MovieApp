const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../Middleware/auth.js');

// Importing Controllers
const userController = require('../Controllers/userController.js');

// User Routes
router.post(
  '/createUser',
  passport.authenticate('jwt', { session: false }),
  userController.createUser
);
router.post('/login', userController.login);

router.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  userController.logout
);

module.exports = router;
