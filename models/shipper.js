const Shipper = require('./schemas/Shipper');
const Load = require('./schemas/Load');
const User = require('./schemas/User');
const ServerError = require('../errors/ServerError');

/** Class representing logic for interaction with Shipper model in database */
class ShipperModel {
  /**
   * Get full shipper profile info.
   * @param {string} id - shipper id.
   * @return {Promise} - Promise object represents shipper instance.
   * @throw {ServerError} - error while creating truck.
   */
  async getFullProfile(id) {
    try {
      const shipper = await Shipper.findById(id)
          .populate('user', '-password')
          .exec();
      return shipper;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  /**
   * Get list of loads.
   * @param {string} id - shipper id.
   * @return {Promise} - Promise object represents load instance.
   * @throw {ServerError} - error while deleting load.
   */
  async getLoadsList(id) {
    try {
      const {loads} = await Shipper.findById(id).populate('loads');
      return loads;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  /**
   * Delete shipper profile.
   * @param {string} id - shipper id.
   * @return {Promise} - Promise object represents deleted shipper instance.
   * @throw {ServerError} - error while deleting shipper.
   */
  async delete(id) {
    try {
      const shipper = await Shipper.findOneAndRemove({_id: id});
      if (!shipper) return null;
      await Load.remove({shipper: id});
      await User.remove({role_id: id});
      return shipper;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }
}

module.exports = new ShipperModel();
