const DriverModel = require('../models/driver');
const LoadModel = require('../models/load');
const {loadState, loadStatus} = require('../utils/loadConstants');
const {truckStatus}= require('../utils/truckConstants');


/** Class representing business logic for common user actions */
class DriverService {
  /**
   * Get driver's profile.
   * @param {string} driverId - id of driver, which info we need to extract.
   * @return {Promise} Promise object represents driver instance.
   */
  async getProfile(driverId) {
    const driver = await DriverModel.getFullProfile(driverId);
    if (!driver) return null;
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
   * @param {String} driverId - driver's id.
   * @param {String} truckId - truck's id to assign.
   * @return {Promise} Promise object represents id of assigned truck.
   */
  async assignTruck(driverId, truckId) {
    const hasAssignedLoad = await DriverModel.hasAssignedLoad(driverId);
    if (hasAssignedLoad) {
      throw new Error(
          'Driver cannot assign truck, because he already has assigned load',
      );
    }
    const assigned = await DriverModel.assignTruck(driverId, truckId);
    return assigned;
  }

  /**
   * Update truck info.
   * @param {String} driver - driver's id.
   * @param {String} truckInfo - truck info to update.
   * @return {Promise} Promise object represents updated truck.
   */
  async updateTruck(driver, truckInfo) {
    const truckId = truckInfo.id;

    const hasAssignedLoad = await DriverModel.hasAssignedLoad(driver);
    if (hasAssignedLoad) {
      throw new Error(
          'You are not allowed to update any truck if you have assigned load',
      );
    }

    const truckAssigned = await DriverModel.isTruckAssigned(driver, truckId);
    if (truckAssigned) {
      throw new Error('You are not allowed to update assigned truck');
    }

    const updatedTruck = await DriverModel.updateTruck(truckInfo);
    return updatedTruck;
  }
  /**
   * Update truck info.
   * @param {String} driverId - driver's id.
   * @param {String} truckId - id of truck to delete.
   * @return {Promise} Promise object represents updated truck.
   */
  async deleteTruck(driverId, truckId) {
    const truckAssigned = await DriverModel.isTruckAssigned(driverId, truckId);
    if (truckAssigned) {
      throw new Error('You are not allowed to delete assigned truck');
    }
    const deletedTruck = await DriverModel.deleteTruck(driverId, truckId);
    return deletedTruck;
  }
  /**
   * Update truck info.
   * @param {String} driverId - driver's id.
   * @return {Promise} Promise object represents driver's load.
   */
  async getLoad(driverId) {
    const load = await DriverModel.getLoad(driverId);
    return load;
  }

  /**
   * Update load status.
   * @param {String} driverId - driver's id.
   * @param {String} state - new load state.
   */
  async changeLoadState(driverId, state) {
    const hasAssignedLoad = await DriverModel.hasAssignedLoad(driverId);
    if (!hasAssignedLoad) {
      throw new Error(
          'There is no assigned load to make any changes.',
      );
    }
    const load = await DriverModel.changeLoadState(driverId, state);
    await LoadModel.addLog(load._id, state);
    if (state === loadState.ARRIVED_TO_DELIVERY) {
      await LoadModel.changeStatus(load._id, loadStatus.SHIPPED);
      await DriverModel.removeLoad(driverId);
      await DriverModel.changeTruckStatus(driverId, truckStatus.IN_SERVICE);
    }
  }
}

module.exports = new DriverService();
