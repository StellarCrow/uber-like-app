const ShipperModel = require('../models/shipper');
const LoadModel = require('../models/load');
const {logMessage, loadStatus, loadState} = require('../utils/loadConstants');

/** Class representing business logic for shipper actions */
class ShipperService {
  /**
   * Get shipper's profile.
   * @param {string} shipperId - id of shipper, which info we need to extract.
   * @return {Promise} Promise object represents shipper instance.
   */
  async getProfile(shipperId) {
    const shipper = await ShipperModel.getFullProfile(shipperId);
    if (!shipper) return null;
    return shipper;
  }
  /**
   * Delete shipper's profile.
   * @param {string} shipperId - id of shipper needed to delete.
   * @return {Promise} Promise object represents deleted shipper instance.
   */
  async deleteShipper(shipperId) {
    const deletedShipper = await ShipperModel.delete(shipperId);
    return deletedShipper;
  }

  /**
   * Create new load.
   * @param {string} shipperId - id of shipper who creates load.
   * @param {string} loadInfo - id of shipper needed to delete.
   * @return {Promise} Promise object represents new load instance.
   */
  async createLoad(shipperId, loadInfo) {
    const newLoad = await LoadModel.create(shipperId, loadInfo);
    return newLoad;
  }

  /**
   * Update load.
   * @param {string} loadId - id of load to update.
   * @param {object} infoToUpdate - load info to update.
   * @return {Promise} Promise object represents load instance.
   */
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

  /**
   * Delete load.
   * @param {string} loadId - id of load needed to delete.
   * @return {Promise} Promise object represents new load instance.
   */
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

  /**
   * Post load.
   * @param {string} loadId - id of load needed to post.
   * @return {Promise} Promise object represents new load instance.
   */
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

  /**
   * Get load.
   * @param {string} loadId - id of load needed to return.
   * @return {Promise} Promise object represents new load instance.
   */
  async getLoad(loadId) {
    const load = await LoadModel.getLoad(loadId);
    return load;
  }

  /**
   * Get list of loads.
   * @param {string} shipperId - shipper id, whose loads need to return.
   * @return {Promise} Promise object represents new load instance.
   */
  async getLoadsList(shipperId) {
    const loads = await ShipperModel.getLoadsList(shipperId);
    return loads;
  }
}

module.exports = new ShipperService();
