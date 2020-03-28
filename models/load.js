const Load = require('./schemas/Load');
const Shipper = require('./schemas/Shipper');
const ServerError = require('../errors/ServerError');
const loadStatus = require('../utils/statuses').loadStatus;

/** Class representing logic for interaction with Load model in database */
class LoadModel {
  /**
   * Create new load.
   * @param {string} shipperId - shipper id.
   * @param {string} loadInfo - new load info.
   * @return {Promise} - Promise object represents new load instance.
   * @throw {ServerError} - error while creating truck.
   */
  async create(shipperId, loadInfo) {
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
        created_by: shipperId,
        name,
        description,
        status,
        dimensions,
        payload,
        deliveryAddress,
        pickUpAddress,
      });
      const update = {$push: {loads: newLoad._id}};
      await Shipper.updateOne({_id: shipperId}, update);
      return newLoad;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  /**
   * Check if load has status NEW.
   * @param {string} loadId - load id.
   * @return {true|false} - true if load has status NEW, false if not.
   * @throw {ServerError} - error while creating truck.
   */
  async isLoadNew(loadId) {
    const load = await Load.findOne({_id: loadId});
    return load.status === loadStatus.NEW;
  }

  /**
   * Check if load exists.
   * @param {string} loadId - load id.
   * @return {true|false} - true if load exists, false if not.
   * @throw {ServerError} - error while creating truck.
   */
  async isLoadExist(loadId) {
    const load = await Load.findOne({_id: loadId});
    if (!load) return false;
    return true;
  }

  /**
   * Update load.
   * @param {string} id - load's id.
   * @param {object} infoToUpdate - load info to update.
   * @return {Promise} - Promise object represents updated load instance.
   * @throw {ServerError} - error while creating truck.
   */
  async updateLoad(id, infoToUpdate) {
    try {
      const updatedLoad = await Load.findOneAndUpdate({_id: id}, infoToUpdate, {
        new: true,
      });
      return updatedLoad;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  /**
   * Delete load.
   * @param {string} id - load id to delete.
   * @return {Promise} - Promise object represents updated load instance.
   * @throw {ServerError} - error while deleting load.
   */
  async delete(id) {
    const deletedLoad = await Load.findOneAndRemove({_id: id});
    await Shipper.findOneAndUpdate(
        {_id: deletedLoad.created_by},
        {$pull: {loads: id}},
    );
    return deletedLoad;
  }
}

module.exports = new LoadModel();
