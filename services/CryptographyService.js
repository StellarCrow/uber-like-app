const bcrypt = require('bcrypt');
const saltRounds = require('config').bcrypt_salt_rounds;

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
      throw new Error(err.message);
    }
  }
}

module.exports = new CryptographyService();
