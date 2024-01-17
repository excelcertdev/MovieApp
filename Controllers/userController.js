import UserModel from "../Models/userModel.js";
import Bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { isValidEmail,isPasswordValid } from '../utils/validation.js'

/* generate JWT Token */
const generateToken = async (payload, expires) => {
  const token = await jwt.sign(payload, process.env.secretKey, { expiresIn: expires ? expires : process.env.tokenExpire });
  return token;
};


/* create user */
const createUser = async (req, res) => {
  const { email, password } = req.body;

  //====Validating Email====//
  let validateEmail = isValidEmail(email);
  if (!validateEmail) {
    return res.status(200).json({ status: false, message: res.__('enter_email') });
  }
  let validatePassword = isPasswordValid(password);
  if (!validatePassword) {
    return res.status(200).json({ status: false, message: res.__('password_msg') });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ status: false, message: res.__('email_exists') });
    }
    const user = new UserModel({
      email,
      password: Bcrypt.hashSync(password),
    });
    const savedUser = await user.save();
    return res.status(200).json({ status: true, message: res.__('success_create'), data: savedUser });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, message: res.__('server_error'), error: err });
  }
};

/* login user */
const login = async (req, res) => {
  const { email, password } = req.body;

  let token;
  if (!email || !password) {
    return res.status(200).json({ status: false, message: res.__('enter_all_fields') });
  }
  try {
    const existingUser = await UserModel.findOne({ 'email': email });
    if (!existingUser) {
      return res.status(200).json({ status: false, message: res.__('user_not_found') });
    }
    let isPasswordCorrect = Bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(200).json({ status: false, message: res.__('invalid_credentials') });
    }
    else {
      const tokendata = { email: existingUser.email };
      token = await generateToken(tokendata);
    }

    const LoggedUser = {
      email: existingUser.email,
      token: token,
    };
    return res.status(200).json({ status: true, message: res.__('login_success'), data: LoggedUser });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, message: res.__('server_error'), error: err });
  }
}

const logout = (req, res) => {
  if (req.user) {
    req.user = null;
    return res.status(200).json({ status:true,message: res.__('logout') });
  } else {
    return res.status(401).json({ status:false,message: res.__('Unauthorized')});
  }
};


export {
  createUser,
  login,
  logout
};
