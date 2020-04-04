const UserModel = require('../models/user');
const CryptographyService = require('./CryptographyService');
const jwt = require('jsonwebtoken');
const secret = require('config').jwt_secret;
const StorageS3 = require('../utils/awsStorage');

class UserService {
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
    const userPasswordRemoved = user.toObject();
    delete userPasswordRemoved.password;
    return {token: jwtToken, user: userPasswordRemoved};
  }

  async changePassword(id, password) {
    const hashedPassword = await CryptographyService.hashPassword(password);
    await UserModel.updatePassword(id, hashedPassword);
  }

  async updateAvatar(id, image) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error('User not found!');
    }
    const imageData = await StorageS3.upload(image, id);
    const imageLocation = imageData.Location;
    await UserModel.updateAvatar(id, imageLocation);
    return imageLocation;
  }
}

module.exports = new UserService();
