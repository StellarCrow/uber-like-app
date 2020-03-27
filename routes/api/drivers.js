const express = require('express');
const router = new express.Router();
const DriverService = require('../../services/DriverService');
const checkPermission = require('../middleware/checkUserPermission.js');
const validate = require('../middleware/requestValidator');
const schemas = require('../../validation/JoiSchemas');


// driver full profile info
router.get(
    '/drivers/:id',
    validate(schemas.routeId, 'params'),
    async (req, res) => {
      const driverId = req.params.id;
      try {
        const driver = await DriverService.getProfile(driverId);
        return res.status(200).json({driver: driver});
      } catch (err) {
        if (err.name === 'ServerError') {
          return res.status(500).json({error: err.message});
        }
        return res.status(404).json({error: err.message});
      }
    },
);

// create new truck
router.post(
    '/drivers/:id/trucks',
    validate(schemas.routeId, 'params'),
    checkPermission(),
    async (req, res) => {
      const driverId = req.params.id;
      const truckInfo = {
        createdBy: driverId,
        status: 'IS',
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
    checkPermission(),
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
router.patch('/drivers/:id/trucks/:sid',
    validate(schemas.routeIds, 'params'),
    checkPermission(),
    async (req, res) => {
      const driverId = req.params.id;
      const truckId = req.params.sid;

      try {
        const assigned = await DriverService.assignTruck(driverId, truckId);
        return res.status(200).json({assignedTruck: assigned});
      } catch (err) {
        if (err.name === 'ServerError') {
          return res.status(500).json({error: err.message});
        }
      }
    });

// update truck info
router.put('/drivers/:id/trucks/:sid',
    validate(schemas.routeIds, 'params'),
    checkPermission(),
    async (req, res) => {
      const driverId = req.params.id;
      const truckId = req.params.sid;
      try {
        await DriverService.updateTruck(driverId, truckId);
      } catch (err) {
        res.status(500);
      }
    });

module.exports = router;
