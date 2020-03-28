const express = require('express');
const router = new express.Router();
const DriverService = require('../../services/DriverService');
const checkPermission = require('../middleware/checkUserPermission.js');
const validate = require('../middleware/requestValidator');
const schemas = require('../../validation/JoiSchemas');
const role = require('../../utils/roles');

// driver full profile info
router.get(
    '/drivers/:id',
    validate(schemas.routeId, 'params'),
    async (req, res) => {
      const driverId = req.params.id;
      try {
        const driver = await DriverService.getProfile(driverId);
        if (!driver) {
          return res.status(404).json({error: 'Not found'});
        }
        return res.status(200).json({driver: driver});
      } catch (err) {
        if (err.name === 'ServerError') {
          return res.status(500).json({error: err.message});
        }
        return res.status(400).json({error: err.message});
      }
    },
);

// create new truck
router.post(
    '/drivers/:id/trucks',
    validate(schemas.routeId, 'params'),
    checkPermission(role.DRIVER),
    async (req, res) => {
      const driverId = req.params.id;
      const truckInfo = {
        createdBy: driverId,
        status: 'FREE',
        type: req.body.type,
        name: req.body.name,
      };
      try {
        const truck = await DriverService.createTruck(truckInfo);
        return res.status(201).json({truck: truck});
      } catch (err) {
        return res.status(500).json({error: err.message});
      }
    },
);

// get driver's trucks
router.get(
    '/drivers/:id/trucks',
    validate(schemas.routeId, 'params'),
    checkPermission(role.DRIVER),
    async (req, res) => {
      const driverId = req.params.id;
      try {
        const trucks = await DriverService.getTrucks(driverId);
        return res.status(200).json({trucks: trucks});
      } catch (err) {
        return res.status(500).json({error: err.message});
      }
    },
);

// assign truck
router.patch(
    '/drivers/:id/trucks/:sid',
    validate(schemas.routeIds, 'params'),
    checkPermission(role.DRIVER),
    async (req, res) => {
      const driverId = req.params.id;
      const truckId = req.params.sid;

      try {
        const assigned = await DriverService.assignTruck(driverId, truckId);
        if (!assigned) {
          return res
              .status(404)
              .json({error: `Truck width id ${truckId} does not exist!`});
        }
        return res.status(200).json({assignedTruck: assigned});
      } catch (err) {
        if (err.name === 'ServerError') {
          return res.status(500).json({error: err.message});
        }
      }
    },
);

// update truck info
router.put(
    '/drivers/:id/trucks/:sid',
    validate(schemas.routeIds, 'params'),
    checkPermission(role.DRIVER),
    validate(schemas.truckUpdate, 'body'),
    async (req, res) => {
      const driverId = req.params.id;
      const truckId = req.params.sid;
      const truckInfo = {
        id: truckId,
        name: req.body.name,
      };
      try {
        const updatedTruck = await DriverService.updateTruck(driverId, truckInfo);
        if (!updatedTruck) {
          return res
              .status(404)
              .json({error: `Truck width id ${truckId} does not exist!`});
        }
        return res.status(200).json({truck: updatedTruck});
      } catch (err) {
        res.status(500).json({error: err.message});
      }
    },
);

// delete truck
router.delete(
    '/drivers/:id/trucks/:sid',
    validate(schemas.routeIds, 'params'),
    checkPermission(role.DRIVER),
    async (req, res) => {
      const driverId = req.params.id;
      const truckId = req.params.sid;

      try {
        const deletedTruck = await DriverService.deleteTruck(driverId, truckId);
        if (!deletedTruck) {
          return res
              .status(404)
              .json({error: `Truck width id ${truckId} does not exist!`});
        }
        res.status(200).json({message: 'Truck was successfully deleted'});
      } catch (err) {
        if (err.name === 'ServerError') {
          res.status(500).json({error: err.message});
        }
        res.status(400).json({error: err.message});
      }
    },
);

router.get(
    '/drivers/:id/loads',
    validate(schemas.routeId, 'params'),
    checkPermission(role.DRIVER),
    async (req, res) => {
      const driverId = req.params.id;
      try {
        const load = await DriverService.getLoad(driverId);
        if (!load) {
          return res
              .status(404)
              .json({error: `There is no load yet.`});
        }
        res.status(200).json({load: load});
      } catch (err) {
        res.status(500).json({error: err.message});
      }
    });

// change load state
router.patch(
    '/drivers/:id/loads',
    validate(schemas.routeId, 'params'),
    checkPermission(role.DRIVER),
    validate(schemas.changeLoadStatus, 'body'),
    async (req, res) => {
      const driverId = req.params.id;
      const state = req.body.state;
      try {
        await DriverService.changeLoadState(driverId, state);
        return res.status(200).json({message: 'Success.'});
      } catch (err) {
        res.status(500).json({error: err.message});
      }
    },
);
module.exports = router;
