const Driver = require('./schemas/Driver');
const Truck = require('./schemas/Truck');
const LoadModel = require('./load');
const ServerError = require('../errors/ServerError');
const {truckStatus} = require('../utils/truckConstants');

class DriverModel {
  async getFullProfile(id) {
    try {
      const driver = await Driver.findById(id)
          .populate('user', '-password')
          .exec();
      return driver;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async createTruck(truckInfo) {
    const {createdBy, status, type, name} = truckInfo;
    try {
      const truck = await Truck.create({
        created_by: createdBy,
        status: status,
        type: type,
        name: name,
      });
      const update = {$push: {trucks: truck._id}};
      await Driver.updateOne({_id: createdBy}, update);
      return truck;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async getTrucks(driverId) {
    try {
      const driver = await Driver.findById(driverId)
          .populate('trucks')
          .exec();
      return driver.trucks;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async hasAssignedLoad(driverId) {
    const driver = await Driver.findById(driverId);
    return driver.has_load;
  }

  async assignTruck(driverId, truckId) {
    try {
      const truckToAssign = await Truck.findById(truckId);
      if (!truckToAssign) {
        return null;
      }
    } catch (err) {
      throw new ServerError(err.message);
    }
    try {
      const driver = await Driver.findById(driverId).populate('assigned_truck');
      // if driver has assigned truck remove it
      const assignedTruckToDriver = driver.assigned_truck;
      if (assignedTruckToDriver) {
        const update = {$unset: {assigned_to: ''}, status: truckStatus.FREE};
        await Truck.findOneAndUpdate({_id: assignedTruckToDriver._id}, update);
      }
      // assign new truck to driver
      const updatedDriver = await Driver.findOneAndUpdate(
          {_id: driverId},
          {assigned_truck: truckId},
          {new: true},
      );
      await Truck.findOneAndUpdate(
          {_id: truckId},
          {assigned_to: driverId, status: truckStatus.IN_SERVICE},
      );
      return updatedDriver.assigned_truck;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async isTruckAssigned(driverId, truckId) {
    const driverInstance = await Driver.findById(driverId);
    return driverInstance.assigned_truck == truckId;
  }

  async updateTruck(truckInfo) {
    const {id, name} = truckInfo;
    try {
      const updatedTruck = await Truck.findOneAndUpdate(
          {_id: id},
          {name: name},
          {new: true},
      );
      if (!updatedTruck) return null;
      return updatedTruck;
    } catch (err) {
      return new ServerError(err.message);
    }
  }

  async deleteTruck(driverId, truckId) {
    try {
      const deletedTruck = await Truck.findOneAndRemove({_id: truckId});
      if (!deletedTruck) return null;
      await Driver.findOneAndUpdate(
          {_id: driverId},
          {$pull: {trucks: truckId}},
      );
      return deletedTruck;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async getLoad(driverId) {
    try {
      const {load} = await Driver.findById({_id: driverId}).populate('load');
      return load;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async changeLoadState(driverId, state) {
    const {load} = await Driver.findById(driverId).populate('load');
    try {
      await LoadModel.changeState(load._id, state);
      return load;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async changeTruckStatus(driverId, status) {
    try {
      const driver = await Driver.findById(driverId).populate('assigned_truck');
      const truck = driver.assigned_truck;
      await Truck.findOneAndUpdate({_id: truck._id}, {status: status});
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async removeLoad(driverId) {
    try {
      const {load} = await Driver.findOneAndUpdate(
          {_id: driverId},
          {$unset: {load: ''}, has_load: false},
      ).populate('load');
      return load;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }
}

module.exports = new DriverModel();
