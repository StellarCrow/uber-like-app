const User = require('./schemas/User');
const Driver = require('./schemas/Driver');
const Shipper = require('./schemas/Shipper');
const ServerError = require('../errors/ServerError');
const roles = require('../utils/roles');

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
      if (role === roles.DRIVER) {
        userRole = await Driver.create({user: newUser._id});
      } else if (role === roles.SHIPPER) {
        userRole = await Shipper.create({user: newUser._id});
      }
      updatedUser = await User.findOneAndUpdate(
          {_id: newUser._id},
          {role_id: userRole._id},
          {new: true},
      ).select('-password');
      return updatedUser;
    } catch (err) {
      throw new ServerError(err);
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
    try {
      const user = await User.findOne({email: email});
      return user;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  /**
   * Find user by email in database.
   * @param {string} email - user's email.
   * @return {Promise} - Promise object user found in db
   * @throw {ServerError} - error while finding user.
   */
  async findByEmail(email) {
    try {
      const user = User.findOne({email});
      return user;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  /**
   * Update user's password in database.
   * @param {string} id - user's id.
   * @param {string} password - new password.
   * @throw {ServerError} - error while finding user.
   */
  async updatePassword(id, password) {
    try {
      await User.findOneAndUpdate({_id: id}, {password: password}, {new: true});
    } catch (err) {
      throw new ServerError(err.message);
    }
  }
}

module.exports = new UserModel();
