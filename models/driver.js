const Driver = require('./schemas/Driver');
const Truck = require('./schemas/Truck');
const ServerError = require('../errors/ServerError');

/** Class representing logic for interaction with Driver model in database */
class DriverModel {
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
}

module.exports = new DriverModel();
