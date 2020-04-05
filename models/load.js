const Load = require('./schemas/Load');
const Shipper = require('./schemas/Shipper');
const Truck = require('./schemas/Truck');
const Driver = require('./schemas/Driver');
const ServerError = require('../errors/ServerError');
const {loadStatus} = require('../utils/loadConstants');
const {truckStatus} = require('../utils/truckConstants');

class LoadModel {
  async create(shipperId, loadInfo) {
    const {
      name,
      description,
      status,
      dimensions,
      payload,
      deliveryAddress,
      pickUpAddress,
    } = loadInfo;
    try {
      const newLoad = await Load.create({
        created_by: shipperId,
        name,
        description,
        status,
        dimensions,
        payload,
        deliveryAddress,
        pickUpAddress,
      });
      const update = {$push: {loads: newLoad._id}};
      await Shipper.updateOne({_id: shipperId}, update);
      return newLoad;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async isLoadNew(loadId) {
    const load = await Load.findOne({_id: loadId});
    return load.status === loadStatus.NEW;
  }

  async isLoadExist(loadId) {
    const load = await Load.findOne({_id: loadId});
    if (!load) return false;
    return true;
  }

  async updateLoad(id, infoToUpdate) {
    try {
      const updatedLoad = await Load.findOneAndUpdate({_id: id}, infoToUpdate, {
        new: true,
      });
      return updatedLoad;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async delete(id) {
    try {
      const deletedLoad = await Load.findOneAndRemove({_id: id});
      await Shipper.findOneAndUpdate(
          {_id: deletedLoad.created_by},
          {$pull: {loads: id}},
      );
      return deletedLoad;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async addLog(id, message) {
    const update = {$push: {logs: {message}}};
    try {
      await Load.findOneAndUpdate({_id: id}, update);
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async getLogs(id) {
    try {
      const logs = await Load.findById(id).select('logs -_id');
      return logs;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async changeStatus(id, status) {
    try {
      await Load.findOneAndUpdate({_id: id}, {status: status});
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async changeState(id, state) {
    try {
      await Load.findOneAndUpdate({_id: id}, {state: state});
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async findTruck(id) {
    try {
      const truckList = await Truck.find({status: truckStatus.IN_SERVICE});
      if (truckList.length === 0) return null;

      const load = await Load.findById(id);
      for (const truck of truckList) {
        const loadFits = this.isLoadFit(load, truck);
        if (loadFits) {
          return truck;
        }
      }
      return null;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  isLoadFit(load, truck) {
    const isValid =
      load.payload < truck.payload &&
      load.dimensions.width < truck.dimensions.width &&
      load.dimensions.height < truck.dimensions.height &&
      load.dimensions.length < truck.dimensions.length;
    if (isValid) {
      return true;
    }
    return false;
  }

  async assignToDriver(loadId, driverId) {
    try {
      await Load.findOneAndUpdate({_id: loadId}, {assigned_to: driverId});
      const driver = await Driver.findOneAndUpdate(
          {_id: driverId},
          {load: loadId, has_load: true},
      );
      await Truck.findOneAndUpdate(
          {_id: driver.assigned_truck},
          {status: truckStatus.ON_LOAD},
      );
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async getLoadsCount(query) {
    try {
      const count = Load.countDocuments(query);
      return count;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }
}

module.exports = new LoadModel();
