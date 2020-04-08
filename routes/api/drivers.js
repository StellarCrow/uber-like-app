const express = require('express');
const router = new express.Router();
const DriverService = require('../../services/DriverService');
const checkPermission = require('../middleware/checkUserPermission.js');
const validate = require('../middleware/requestValidator');
const schemas = require('../../validation/JoiSchemas');
const role = require('../../utils/roles');


/**
 * @api {get} /api/drivers/:id Get driver profile
 * @apiName GetDriver
 * @apiGroup Drivers
 *
 * @apiParam {String} id Driver id
 *
 * @apiSuccess {Object} driver full info about driver profile.
 *
 * @apiError ServerError Server error
 * @apiError DriverNotFound The <code>id</code> of the Driver was not found.
 */

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

/**
 * @api {post} /api/drivers/:id/trucks Create new truck
 * @apiName CreateTruck
 * @apiGroup Drivers
 *
 * @apiParam {String} type Truck type
 * @apiParam {String} name Truck name
 *
 *
 * @apiSuccess {Object} truck New created truck.
 *
 * @apiError ServerError Server error
 */
router.post(
    '/drivers/:id/trucks',
    validate(schemas.routeId, 'params'),
    checkPermission(role.DRIVER),
    validate(schemas.createTruck, 'body'),
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

/**
 * @api {get} /api/drivers/:id/trucks Get all driver's trucks
 * @apiName GetTrucks
 * @apiGroup Drivers
 *
 * @apiParam {String} id Driver id
 *
 *
 * @apiSuccess {Object[]} truck Array of Driver's trucks.
 *
 * @apiError ServerError Server error
 */

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

/**
 * @api {patch} /api/drivers/:id/trucks/:sid Assign truck to Driver
 * @apiName AssignTruck
 * @apiGroup Drivers
 *
 * @apiParam {String} id Driver id
 * @apiParam {String} id Truck id
 *
 * @apiSuccess {String} truck id of assigned truck.
 *
 * @apiError ServerError Server error
 * @apiError TruckNotFound Truck with <code>id</code> doesn't exist
 */

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
        return res.status(200).json({truck: assigned});
      } catch (err) {
        if (err.name === 'ServerError') {
          return res.status(500).json({error: err.message});
        }
      }
    },
);

/**
 * @api {put} /api/drivers/:id/trucks/:sid Update truck info
 * @apiName UpdateTruck
 * @apiGroup Drivers
 *
 * @apiParam {String} id Driver id
 * @apiParam {String} id Truck id
 * @apiParam {String} name Truck name
 *
 * @apiSuccess {Object} truck updated truck instance.
 *
 * @apiError ServerError Server error
 * @apiError TruckNotFound Truck with <code>id</code> doesn't exist
 */

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

/**
 * @api {delete} /api/drivers/:id/trucks/:sid Delete truck
 * @apiName DeleteTruck
 * @apiGroup Drivers
 *
 * @apiParam {String} id Driver id
 * @apiParam {String} id Truck id
 *
 * @apiSuccess {String} message Successfully deleted.
 *
 * @apiError ServerError Server error
 * @apiError TruckNotFound Truck with <code>id</code> doesn't exist
 */

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
        res.status(200).json({message: 'Successfully deleted'});
      } catch (err) {
        if (err.name === 'ServerError') {
          res.status(500).json({error: err.message});
        }
        res.status(400).json({error: err.message});
      }
    },
);

/**
 * @api {get} /api/drivers/:id/loads Get driver's load
 * @apiName GetDriverLoad
 * @apiGroup Drivers
 *
 * @apiParam {String} id Driver id
 *
 * @apiSuccess {Object} load Driver's assigned load.
 *
 * @apiError ServerError Server error
 * @apiError LoadNotFound There is no load yet.
 */
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

/**
 * @api {patch} /api/drivers/:id/loads Change state of assigned load
 * @apiName ChangeLoadState
 * @apiGroup Drivers
 *
 * @apiParam {String} id Driver id
 * @apiParam {String} state load state
 *
 * @apiSuccess {String} message Successfully updated state.
 *
 * @apiError ServerError Server error
 */
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
        return res.status(200).json({message: 'Successfully updated state.'});
      } catch (err) {
        res.status(500).json({error: err.message});
      }
    },
);
module.exports = router;
