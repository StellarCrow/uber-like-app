const ShipperModel = require('../models/shipper');
const LoadModel = require('../models/load');
const {logMessage, loadStatus, loadState} = require('../utils/loadConstants');

class ShipperService {
  async getProfile(shipperId) {
    const shipper = await ShipperModel.getFullProfile(shipperId);
    if (!shipper) return null;
    return shipper;
  }

  async deleteShipper(shipperId) {
    const deletedShipper = await ShipperModel.delete(shipperId);
    return deletedShipper;
  }

  async createLoad(shipperId, loadInfo) {
    const newLoad = await LoadModel.create(shipperId, loadInfo);
    return newLoad;
  }

  async updateLoad(loadId, infoToUpdate) {
    const isLoadExist = await LoadModel.isLoadExist(loadId);
    if (!isLoadExist) return null;
    const isLoadNew = await LoadModel.isLoadNew(loadId);
    if (!isLoadNew) {
      throw new Error('It is allowed to change loads only with status "NEW"');
    }
    const updatedLoad = await LoadModel.updateLoad(loadId, infoToUpdate);
    return updatedLoad;
  }

  async deleteLoad(loadId) {
    const isLoadExist = await LoadModel.isLoadExist(loadId);
    if (!isLoadExist) return null;
    const isLoadNew = await LoadModel.isLoadNew(loadId);
    if (!isLoadNew) {
      throw new Error('It is allowed to delete loads only with status "NEW"');
    }
    const deletedLoad = await LoadModel.delete(loadId);
    return deletedLoad;
  }

  async postLoad(loadId) {
    const isLoadExist = await LoadModel.isLoadExist(loadId);
    if (!isLoadExist) {
      throw new Error('Load not found.');
    }

    const isLoadNew = await LoadModel.isLoadNew(loadId);
    if (!isLoadNew) {
      throw new Error('It is allowed to post loads only with status "NEW"');
    }

    await LoadModel.changeStatus(loadId, loadStatus.POSTED);
    await LoadModel.addLog(loadId, logMessage.POSTING_LOAD);

    const truck = await LoadModel.findTruck(loadId);
    if (!truck) {
      await LoadModel.changeStatus(loadId, loadStatus.NEW);
      await LoadModel.addLog(loadId, logMessage.DRIVER_NOT_FOUND);
      throw new Error('Driver not found. Load state changed to NEW.');
    }

    const driverId = truck.assigned_to;
    await LoadModel.assignToDriver(loadId, driverId);
    await LoadModel.changeStatus(loadId, loadStatus.ASSIGNED);
    await LoadModel.addLog(loadId, logMessage.DRIVER_FOUND);
    await LoadModel.changeState(loadId, loadState.EN_ROUTE_TO_PICK_UP);
    await LoadModel.addLog(loadId, logMessage.EN_ROUTE_TO_PICKUP);
  }

  async getShippingInfo(loadId) {
    const logs = await LoadModel.getLogs(loadId);
    return logs;
  }

  async getLoadsList(shipperId) {
    const loads = await ShipperModel.getLoadsList(shipperId);
    return loads;
  }
}

module.exports = new ShipperService();
