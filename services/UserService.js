const UserModel = require('../models/user');
/** Class representing business logic for common user actions */
class UserService {
  /**
   * Registrate user.
   * @param {object} user - user's credentials for registration.
   * @return {object} - a new created user.
   */
  async registrate(user) {
    const {email} = user;
    const isEmailUnique = await UserModel.isEmailUnique(email);
    if (!isEmailUnique) {
      throw new Error('This email is already exist in the system.');
    }
    const newUser = await UserModel.create(user);
    return newUser;
  }
}

module.exports = new UserService();
