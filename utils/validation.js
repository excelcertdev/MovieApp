import validator from 'validator';

  /* check if email is valid using validator */
  function isValidEmail(email) {
    let validEmail = validator.isEmail(email);
    if (!validEmail) {
      return false;
    }
    return true;
  }
  
  /* check if password is valid using validator */
  function isPasswordValid(password) {
    const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordValidationRegex.test(password);
  }
  
  export { isValidEmail,isPasswordValid };