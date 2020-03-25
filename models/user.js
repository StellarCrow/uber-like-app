const User = require('./schemas/User');
const ServerError = require('../errors/ServerError');

/** Class representing logic for interaction with User model in database */
class UserModel {
  /**
   * Create new user in database.
   * @param {object} user - user's credentials for registration.
   * @return {Promise} - Promise object represents new created user.
   * @throw {ServerError} - error while creating user.
   */
  async create(user) {
    const {email, password, role, name} = user;
    return User.create({email, password, name, role})
        .then((user) => {
          return user;
        })
        .catch((err) => {
          throw new ServerError(err.message);
        });
  }

  /**
   * Check if user with email exists in database.
   * @param {string} email - user's email.
   * @return {Promise} - Promise object represents status (true/false)
   * if user with email exists.
   * @throw {ServerError} - error while finding user.
   */
  async isEmailExists(email) {
    return User.findOne({email: email})
        .then((user) => {
          if (user) return true;
          return false;
        })
        .catch((err) => {
          throw new ServerError(err.message);
        });
  }

  /**
   * Find user by email in database.
   * @param {string} email - user's email.
   * @return {Promise} - Promise object user found in db
   * @throw {ServerError} - error while finding user.
   */
  async findByEmail(email) {
    return User.findOne({email})
        .then((user) => {
          return user;
        })
        .catch((err) => {
          throw new ServerError(err.message);
        });
  }
}

module.exports = new UserModel();
