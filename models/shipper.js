const Shipper = require('./schemas/Shipper');
const Load = require('./schemas/Load');
const User = require('./schemas/User');
const ServerError = require('../errors/ServerError');

class ShipperModel {
  async getFullProfile(id) {
    try {
      const shipper = await Shipper.findById(id)
          .populate('user', '-password').populate('loads')
          .exec();
      return shipper;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async getLoadsList(id, status) {
    try {
      const options = {
        created_by: id,
        status: {$regex: status},
      };
      const loads = await Load.find(options);
      return loads;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async delete(id) {
    try {
      const shipper = await Shipper.findOneAndRemove({_id: id});
      if (!shipper) return null;
      // await Load.remove({shipper: id});
      await User.remove({role_id: id});
      return shipper;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }
}

module.exports = new ShipperModel();
