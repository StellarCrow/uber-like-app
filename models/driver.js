const Driver = require('./schemas/Driver');
const Truck = require('./schemas/Truck');
const ServerError = require('../errors/ServerError');

/** Class representing logic for interaction with Driver model in database */
class DriverModel {
  /**
   * Create new truck in database.
   * @param {string} id - truck information for creation.
   * @return {Promise} - Promise object represents driver instance.
   * @throw {ServerError} - error while creating truck.
   */
  async getFullProfile(id) {
    const driver = await Driver.findById(id)
        .populate('user')
        .exec();
    return driver;
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
   * @return {true|false} - true if load assigned and false if not.
   * @throw {ServerError} - db error.
   */
  async assignTruck(driverId, truckId) {
    try {
      const driver = await Driver.findById(driverId)
          .populate('assigned_truck');
      // if driver has assigned truck remove it
      const assignedTruckToDriver = driver.assigned_truck;
      if (assignedTruckToDriver) {
        await Truck.findOneAndUpdate(
            {_id: assignedTruckToDriver._id},
            {$unset: {assigned_to: ''}},
        );
      }
      // assign new truck to driver
      const updatedDriver = await Driver.findOneAndUpdate(
          {_id: driverId},
          {assigned_truck: truckId},
          {new: true},
      );
      await Truck.findOneAndUpdate({_id: truckId}, {assigned_to: driverId});
      return updatedDriver.assigned_truck;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }
}

module.exports = new DriverModel();
