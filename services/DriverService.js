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
    if (!driver) {
      throw new Error('Driver not found');
    }
    const driverObject = driver.toObject();
    delete driverObject.user.password;
    return driverObject;
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

  /**
   * Create truck.
   * @param {String} driver - driver's id.
   * @param {String} truck - truck's id to assign.
   * @return {String} Promise object represents array of driver's trucks.
   */
  async assignTruck(driver, truck) {
    const hasAssignedLoad = await DriverModel.hasAssignedLoad(driver);
    if (hasAssignedLoad) {
      throw new Error(
          'Driver cannot assign truck, because he already has assigned load',
      );
    }
    const assigned = await DriverModel.assignTruck(driver, truck);
    return assigned;
  }
}

module.exports = new DriverService();
