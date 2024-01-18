const UserModel = require('../Models/userModel.js');
const Bcrypt = require('bcryptjs');
const {
  isValidEmail,
  isPasswordValid,
  generateToken,
} = require('../utils/validation.js');

const log = require('../utils/logger.js');

/* create user */
const createUser = async (req, res) => {
  const { email, password } = req.body;

  // ==== Validating Email and Password ==== //
  const validateEmail = isValidEmail(email);
  if (!validateEmail) {
    return res
      .status(200)
      .json({ status: false, message: res.__('enter_email') });
  }
  const validatePassword = isPasswordValid(password);
  if (!validatePassword) {
    return res
      .status(200)
      .json({ status: false, message: res.__('password_msg') });
  }

  try {
    // Check if the user with the same email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json({ status: false, message: res.__('email_exists') });
    }

    // Create a new user with hashed password
    const user = new UserModel({
      email,
      password: Bcrypt.hashSync(password),
    });

    const savedUser = await user.save();
    return res.status(200).json({
      status: true,
      message: res.__('success_create'),
      data: savedUser,
    });
  } catch (err) {
    // Log and handle errors
    log.error(`Failed to create user \n error ${err} `);
    return res.status(500).json({
      status: false,
      message: res.__('server_error'),
      error: err,
    });
  }
};

/* login user */
const login = async (req, res) => {
  const { email, password } = req.body;

  let token;
  // Check if both email and password are provided
  if (!email || !password) {
    return res
      .status(200)
      .json({ status: false, message: res.__('enter_all_fields') });
  }
  try {
    // Find the user by email
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res
        .status(200)
        .json({ status: false, message: res.__('user_not_found') });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordCorrect = Bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(200)
        .json({ status: false, message: res.__('invalid_credentials') });
    } else {
      // Generate a JWT token on successful login
      const tokendata = { email: existingUser.email };
      token = await generateToken(tokendata);
    }

    const LoggedUser = {
      email: existingUser.email,
      token,
    };
    return res.status(200).json({
      status: true,
      message: res.__('login_success'),
      data: LoggedUser,
    });
  } catch (err) {
    // Log and handle errors
    log.error(`Failed to login \n error ${err} `);
    return res.status(500).json({
      status: false,
      message: res.__('server_error'),
      error: err,
    });
  }
};

/* logout user */
const logout = (req, res) => {
  // Check if the user is authenticated
  if (req.user) {
    // Set user to null to simulate logout
    req.user = null;
    return res.status(200).json({ status: true, message: res.__('logout') });
  } else {
    return res
      .status(401)
      .json({ status: false, message: res.__('Unauthorized') });
  }
};

// Export the controller functions
module.exports = { createUser, login, logout };
