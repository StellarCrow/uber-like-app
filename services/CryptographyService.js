const bcrypt = require('bcrypt');
const {saltRounds} = require('../utils/constants');
const ServerError = require('../errors/ServerError');

class CryptographyService {
  async hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async comparePasswords(password, userPassword) {
    return bcrypt.compare(password, userPassword).then((result) => {
      return result;
    });
  }
}

module.exports = new CryptographyService();
