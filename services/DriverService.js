const DriverModel = require('../models/driver');
/** Class representing business logic for common user actions */
class DriverService {
  /**
   * Create truck.
   * @param {object} truckInfo - info for creating new truck.
   * @return {Promise} Promise object represents new truck.
   */
  async createTruck(truckInfo) {
    const truck = await DriverModel.createTruck(truckInfo);
    return truck;
  }
}

module.exports = new DriverService();
