const Load = require('./schemas/Load');
const Shipper = require('./schemas/Shipper');
const Truck = require('./schemas/Truck');
const Driver = require('./schemas/Driver');
const ServerError = require('../errors/ServerError');
const {loadStatus} = require('../utils/loadConstants');
const {truckStatus} = require('../utils/truckConstants');

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
    try {
      const deletedLoad = await Load.findOneAndRemove({_id: id});
      await Shipper.findOneAndUpdate(
          {_id: deletedLoad.created_by},
          {$pull: {loads: id}},
      );
      return deletedLoad;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  /**
   * Delete load.
   * @param {string} id - load where to add new log.
   * @param {string} message - message for log.
   * @return {Promise} - Promise object represents updated load instance.
   * @throw {ServerError} - error while deleting load.
   */
  async addLog(id, message) {
    const update = {$push: {logs: {message}}};
    try {
      await Load.findOneAndUpdate({_id: id}, update);
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  /**
   * Change load status.
   * @param {string} id - load.
   * @param {string} status - new status for load.
   * @throw {ServerError} - error while deleting load.
   */
  async changeStatus(id, status) {
    try {
      await Load.findOneAndUpdate({_id: id}, {status: status});
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  /**
   * Change load state.
   * @param {string} id - load.
   * @param {string} state - new state for load.
   * @throw {ServerError} - error while deleting load.
   */
  async changeState(id, state) {
    try {
      await Load.findOneAndUpdate({_id: id}, {state: state});
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  /**
   * Find truck for load.
   * @param {string} id - load.
   * @return {object} found truck
   * @throw {ServerError} - error while deleting load.
   */
  async findTruck(id) {
    try {
      const truckList = await Truck.find({status: truckStatus.IN_SERVICE});
      if (truckList.length === 0) return null;

      const load = await Load.findById(id);
      let foundTruck = null;
      for (const truck of truckList) {
        if (load.payload > truck.payload) continue;
        if (load.dimensions.width > truck.dimensions.width) continue;
        if (load.dimensions.height > truck.dimensions.height) continue;
        if (load.dimensions.length > truck.dimensions.length) continue;
        foundTruck = truck;
        break;
      }
      return foundTruck;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  /**
   * Assign load to driver.
   * @param {string} loadId - load.
   * @param {string} driverId - driver.
   * @throw {ServerError} - error while deleting load.
   */
  async assignToDriver(loadId, driverId) {
    try {
      await Load.findOneAndUpdate({_id: loadId}, {assigned_to: driverId});
      const driver = await Driver.findOneAndUpdate(
          {_id: driverId},
          {load: loadId, has_load: true},
      );
      await Truck.findOneAndUpdate(
          {_id: driver.assigned_truck},
          {status: truckStatus.ON_LOAD},
      );
    } catch (err) {
      throw new ServerError(err.message);
    }
  }
}

module.exports = new LoadModel();
