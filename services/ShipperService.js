const ShipperModel = require('../models/shipper');
const LoadModel = require('../models/load');

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
    const shipperObject = shipper.toObject();
    delete shipperObject.user.password;
    return shipperObject;
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
}

module.exports = new ShipperService();
