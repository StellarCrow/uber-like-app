const User = require('./schemas/User');
const Driver = require('./schemas/Driver');
const Shipper = require('./schemas/Shipper');
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
    let updatedUser;
    let userRole;
    try {
      const newUser = await User.create({email, password, name, role});
      if (role === 'driver') {
        userRole = await Driver.create({user_id: newUser._id});
      } else if (role === 'shipper') {
        userRole = await Shipper.create({user_id: newUser._id});
      }
      updatedUser = await User.findOneAndUpdate({_id: newUser._id}, {role_id: userRole._id}, {new: true});
      return updatedUser;
    } catch (err) {
      throw new ServerError(err.message);
    }
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
    return await User.findOne({email})
        .then((user) => {
          return user;
        })
        .catch((err) => {
          throw new ServerError(err.message);
        });
  }
}

module.exports = new UserModel();
