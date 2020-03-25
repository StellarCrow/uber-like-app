const bcrypt = require('bcrypt');
const saltRounds = require('config').bcrypt_salt_rounds;
const ServerError = require('../errors/ServerError');

/** Class representing logic for cryptography functions */
class CryptographyService {
  /**
   * Hash password.
   * @param {string} password - password to hash.
   * @return {Promise} Promise object represents a string - hashed password.
   */
  async hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  /**
   * Hash password.
   * @param {string} password - password to compare.
   * @param {string} userPassword - user's password from db.
   * @return {Promise} Promise object represents boolean result of comparing.
   */
  async comparePasswords(password, userPassword) {
    return bcrypt.compare(password, userPassword).then((result) => {
      return result;
    });
  }
}

module.exports = new CryptographyService();
