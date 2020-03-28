const ShipperModel = require('../models/shipper');

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
    const newLoad = await ShipperModel.createLoad(shipperId, loadInfo);
    return newLoad;
  }
}

module.exports = new ShipperService();
