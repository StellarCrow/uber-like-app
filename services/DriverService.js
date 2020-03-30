const DriverModel = require('../models/driver');
const LoadModel = require('../models/load');
const {loadState, loadStatus} = require('../utils/loadConstants');
const {truckStatus} = require('../utils/truckConstants');

class DriverService {
  async getProfile(driverId) {
    const driver = await DriverModel.getFullProfile(driverId);
    if (!driver) return null;
    return driver;
  }

  async createTruck(truckInfo) {
    const truck = await DriverModel.createTruck(truckInfo);
    return truck;
  }

  async getTrucks(driverId) {
    const trucks = await DriverModel.getTrucks(driverId);
    return trucks;
  }

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

  async deleteTruck(driverId, truckId) {
    const truckAssigned = await DriverModel.isTruckAssigned(driverId, truckId);
    if (truckAssigned) {
      throw new Error('You are not allowed to delete assigned truck');
    }
    const deletedTruck = await DriverModel.deleteTruck(driverId, truckId);
    return deletedTruck;
  }

  async getLoad(driverId) {
    const load = await DriverModel.getLoad(driverId);
    return load;
  }

  async changeLoadState(driverId, state) {
    const hasAssignedLoad = await DriverModel.hasAssignedLoad(driverId);
    if (!hasAssignedLoad) {
      throw new Error('There is no assigned load to make any changes.');
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
