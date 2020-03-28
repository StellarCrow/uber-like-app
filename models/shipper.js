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
          .populate('user')
          .exec();
      return shipper;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  /**
   * Get full shipper profile info.
   * @param {string} id - shipper id.
   * @return {Promise} - Promise object represents shipper instance.
   * @throw {ServerError} - error while creating truck.
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

  /**
   * Create new load.
   * @param {string} id - shipper id.
   * @param {string} loadInfo - new load info.
   * @return {Promise} - Promise object represents new load instance.
   * @throw {ServerError} - error while creating truck.
   */
  async createLoad(id, loadInfo) {
    const {
      name,
      description,
      status,
      dimensions,
      payload,
      deliveryAddress,
      pickUpAddress,
    } = loadInfo;
    try {
      const newLoad = await Load.create({
        created_by: id,
        name,
        description,
        status,
        dimensions,
        payload,
        deliveryAddress,
        pickUpAddress,
      });
      const update = {$push: {loads: newLoad._id}};
      await Shipper.updateOne({_id: id}, update);
      return newLoad;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }
}

module.exports = new ShipperModel();
