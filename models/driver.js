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
    const driver = await Driver.findById(id).populate('user').exec();
    return driver;
  }
  /**
   * Create new truck in database.
   * @param {Object} truckInfo - truck information for creation.
   * @return {Promise} - Promise object represents new created truck.
   * @throw {ServerError} - error while creating truck.
   */
  async createTruck(truckInfo) {
    const {createdBy, status, type} = truckInfo;
    try {
      const truck = await Truck.create({
        created_by: createdBy,
        status: status,
        type: type,
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
}

module.exports = new DriverModel();
