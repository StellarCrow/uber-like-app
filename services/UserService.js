const UserModel = require('../models/user');
const CryptographyService = require('./CryptographyService');

/** Class representing business logic for common user actions */
class UserService {
  /**
   * Registrate user.
   * @param {object} user - user's credentials for registration.
   * @return {Promise} Promise object represents new user.
   */
  async registrate(user) {
    const {email, password} = user;
    const isEmailUnique = await UserModel.isEmailUnique(email);
    if (!isEmailUnique) {
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
}

module.exports = new UserService();
