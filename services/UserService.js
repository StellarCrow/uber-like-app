const UserModel = require('../models/user');
const CryptographyService = require('./CryptographyService');
const jwt = require('jsonwebtoken');
const secret = require('config').jwt_secret;

/** Class representing business logic for common user actions */
class UserService {
  /**
   * Registrate user.
   * @param {object} user - user's credentials for registration.
   * @return {Promise} Promise object represents new user.
   */
  async registrate(user) {
    const {email, password} = user;
    const isEmailExists = await UserModel.isEmailExists(email);
    if (isEmailExists) {
      throw new Error('This email is already exist in the system.');
    }
    try {
      const hashedPassword = await CryptographyService.hashPassword(password);
      user.password = hashedPassword;
    } catch (err) {
      throw new Error('Error while hashing password.');
    }
    const newUser = await UserModel.create(user);
    return newUser;
  }
  /**
   * Registrate user.
   * @param {object} userInfo - user's credentials for sign in.
   * @return {Promise} Promise object represents new user.
   */
  async authenticate(userInfo) {
    const {email, password} = userInfo;
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Wrong email');
    }
    const match = await CryptographyService.comparePasswords(
        password,
        user.password,
    );
    if (!match) {
      throw new Error('Wrong password');
    }
    const payload = {
      id: user.role_id,
      user_id: user._id,
      email: user.email,
      role: user.role,
    };
    const jwtToken = jwt.sign(payload, secret);
    return {token: jwtToken, user: user};
  }

  /**
   * Registrate user.
   * @param {string} id - user's id.
   * @param {string} password - new password.
   */
  async changePassword(id, password) {
    const hashedPassword = await CryptographyService.hashPassword(password);
    const newPassword = await UserModel.updatePassword(id, hashedPassword);
    return newPassword;
  }
}

module.exports = new UserService();
