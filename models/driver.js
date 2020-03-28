const Driver = require('./schemas/Driver');
const Truck = require('./schemas/Truck');
const ServerError = require('../errors/ServerError');
const {truckStatus} = require('../utils/truckConstants');

/** Class representing logic for interaction with Driver model in database */
class DriverModel {
  /**
   * Create new truck in database.
   * @param {string} id - truck information for creation.
   * @return {Promise} - Promise object represents driver instance.
   * @throw {ServerError} - error while creating truck.
   */
  async getFullProfile(id) {
    try {
      const driver = await Driver.findById(id)
          .populate('user')
          .exec();
      return driver;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }
  /**
   * Create new truck in database.
   * @param {Object} truckInfo - truck information for creation.
   * @return {Promise} - Promise object represents new created truck.
   * @throw {ServerError} - error while creating truck.
   */
  async createTruck(truckInfo) {
    const {createdBy, status, type, name} = truckInfo;
    try {
      const truck = await Truck.create({
        created_by: createdBy,
        status: status,
        type: type,
        name: name,
      });
      const update = {$push: {trucks: truck._id}};
      await Driver.updateOne({_id: createdBy}, update);
      return truck;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  /**
   * Get array of user's trucks from database.
   * @param {string} driverId - driver's id.
   * @return {Promise} - Promise object represents array of trucks.
   * @throw {ServerError} - error while getting trucks.
   */
  async getTrucks(driverId) {
    try {
      const driver = await Driver.findById(driverId)
          .populate('trucks')
          .exec();
      return driver.trucks;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }
  /**
   * Check if driver has assigned to him load.
   * @param {string} driverId - driver's id.
   * @return {true|false} - true if load assigned and false if not.
   * @throw {ServerError} - db error.
   */
  async hasAssignedLoad(driverId) {
    const driver = await Driver.findById(driverId);
    return driver.has_load;
  }
  /**
   * Assign truck to driver.
   * @param {string} driverId - driver's id.
   * @param {string} truckId - truck id to assign.
   * @return {string} - id of assigned truck.
   * @throw {ServerError} - db error.
   */
  async assignTruck(driverId, truckId) {
    try {
      const truckToAssign = await Truck.findById(truckId);
      if (!truckToAssign) {
        return null;
      }
    } catch (err) {
      throw new ServerError(err.message);
    }
    try {
      const driver = await Driver.findById(driverId).populate('assigned_truck');
      // if driver has assigned truck remove it
      const assignedTruckToDriver = driver.assigned_truck;
      if (assignedTruckToDriver) {
        const update = {$unset: {assigned_to: ''}, status: truckStatus.FREE};
        await Truck.findOneAndUpdate({_id: assignedTruckToDriver._id}, update);
      }
      // assign new truck to driver
      const updatedDriver = await Driver.findOneAndUpdate(
          {_id: driverId},
          {assigned_truck: truckId},
          {new: true},
      );
      await Truck.findOneAndUpdate(
          {_id: truckId},
          {assigned_to: driverId, status: truckStatus.IN_SERVICE},
      );
      return updatedDriver.assigned_truck;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  /**
   * Check if driver assigned truck.
   * @param {string} driverId - driver's id.
   * @param {string} truckId - truck's id.
   * @return {true|false} - true if truck is assigned, false if not.
   * @throw {ServerError} - db error.
   */
  async isTruckAssigned(driverId, truckId) {
    const driverInstance = await Driver.findById(driverId);
    return driverInstance.assigned_truck == truckId;
  }

  /**
   * Update truck.
   * @param {object} truckInfo - truck info.
   * @return {Promise} - Promise object represents updated truck instance.
   * @throw {ServerError} - db error.
   */
  async updateTruck(truckInfo) {
    const {id, name} = truckInfo;
    try {
      const updatedTruck = await Truck.findOneAndUpdate(
          {_id: id},
          {name: name},
          {new: true},
      );
      if (!updatedTruck) return null;
      return updatedTruck;
    } catch (err) {
      return new ServerError(err.message);
    }
  }

  /**
   * Delete truck.
   * @param {string} driverId - driver's id.
   * @param {string} truckId - id of truck to delete.
   * @return {Promise} - Promise object represents deleted truck instance.
   * @throw {ServerError} - db error.
   */
  async deleteTruck(driverId, truckId) {
    try {
      const deletedTruck = await Truck.findOneAndRemove({_id: truckId});
      if (!deletedTruck) return null;
      await Driver.findOneAndUpdate(
          {_id: driverId},
          {$pull: {trucks: truckId}},
      );
      return deletedTruck;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  /**
   * Get load.
   * @param {string} driverId - driver's id.
   * @return {Promise} - Promise object represents load.
   * @throw {ServerError} - db error.
   */
  async getLoad(driverId) {
    const {load} = await Driver.findById({_id: driverId}).populate('load');
    return load;
  }
}

module.exports = new DriverModel();
