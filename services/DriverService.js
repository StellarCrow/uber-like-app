const DriverModel = require('../models/driver');
/** Class representing business logic for common user actions */
class DriverService {
  /**
   * Get driver's profile.
   * @param {string} driverId - id of driver, which info we need to extract.
   * @return {Promise} Promise object represents driver instance.
   */
  async getProfile(driverId) {
    const driver = await DriverModel.getFullProfile(driverId);
    return driver;
  }
  /**
   * Create truck.
   * @param {object} truckInfo - info for creating new truck.
   * @return {Promise} Promise object represents new truck.
   */
  async createTruck(truckInfo) {
    const truck = await DriverModel.createTruck(truckInfo);
    return truck;
  }
  /**
   * Create truck.
   * @param {string} driverId - driver's id.
   * @return {Promise} Promise object represents array of driver's trucks.
   */
  async getTrucks(driverId) {
    const trucks = await DriverModel.getTrucks(driverId);
    return trucks;
  }
}

module.exports = new DriverService();
