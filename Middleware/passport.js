import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from 'passport';
import UserModel from "../Models/userModel.js";
import dotenv from 'dotenv';
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
            email: user.email
          };
          next(null, senddata);
        } else {
          next(null, false);
        }
      } catch (err) {
        console.error(err);
        next(err, false);
      }
    }
  )
);
