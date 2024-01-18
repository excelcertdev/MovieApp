const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const UserModel = require('../Models/userModel.js');
const dotenv = require('dotenv');
const log = require('../utils/logger.js');
const environment = process.env.NODE_ENV || 'dev';
dotenv.config({
  path: `.env.${environment}`,
});

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.secretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (jwt_payload, next) => {
      const { email } = jwt_payload;
      try {
        const user = await UserModel.findOne({ email });

        if (user) {
          const senddata = {
            id: user._id,
            email: user.email,
          };
          next(null, senddata);
        } else {
          next(null, false);
        }
      } catch (err) {
        log.error(`Failed in authenticating user \n error ${err} `);
        next(err, false);
      }
    }
  )
);
