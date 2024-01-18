const validator = require('validator');
const jwt = require('jsonwebtoken');

/* check if email is valid using validator */
function isValidEmail(email) {
  const validEmail = validator.isEmail(email);
  if (!validEmail) {
    return false;
  }
  return true;
}

/* check if password is valid using validator */
function isPasswordValid(password) {
  const passwordValidationRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordValidationRegex.test(password);
}

/* generate JWT Token */
const generateToken = (payload, expires) => {
  // Generate a JWT token with the specified payload and expiration time
  const token = jwt.sign(payload, process.env.secretKey, {
    expiresIn: expires ? expires : process.env.tokenExpire,
  });
  return token;
};

module.exports = { isValidEmail, isPasswordValid, generateToken };
