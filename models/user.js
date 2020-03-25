const User = require('./schemas/User');

/** Class representing logic for interaction with User model in database */
class UserModel {
  /**
   * Create new user in database.
   * @param {object} user - user's credentials for registration.
   * @return {Promise} - Promise object represents new created user.
   * @throw {Error} - error while creating user.
   */
  async create(user) {
    const {email, password, role, name} = user;
    return User.create({email, password, name, role})
        .then((user) => {
          return user;
        })
        .catch((err) => {
          throw new Error(err.message);
        });
  }

  /**
   * Check if user with email exists in database.
   * @param {string} email - user's email.
   * @return {Promise} - Promise object represents status (true/false)
   * if user with email exists.
   * @throw {Error} - error while finding user.
   */
  async isEmailUnique(email) {
    return User.findOne({email: email})
        .then((user) => {
          if (user) return false;
          return true;
        })
        .catch((err) => {
          throw new Error(err.message);
        });
  }
}

module.exports = new UserModel();
