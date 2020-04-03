const User = require('./schemas/User');
const Driver = require('./schemas/Driver');
const Shipper = require('./schemas/Shipper');
const ServerError = require('../errors/ServerError');
const roles = require('../utils/roles');

class UserModel {
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

  async isEmailExists(email) {
    try {
      const user = await User.findOne({email: email});
      return user;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async findByEmail(email) {
    try {
      const user = User.findOne({email});
      return user;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async findById(id) {
    try {
      const user = User.findById(id).select('-_id');
      return user;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async updatePassword(id, password) {
    try {
      await User.findOneAndUpdate({_id: id}, {password: password}, {new: true});
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async updateAvatar(id, imagePath) {
    try {
      await User.findByIdAndUpdate(id, {avatar: imagePath});
    } catch (err) {
      throw new ServerError(err.message);
    }
  }
}

module.exports = new UserModel();
