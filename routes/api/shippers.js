const express = require('express');
const router = new express.Router();
const ShipperService = require('../../services/ShipperService');
const checkPermission = require('../middleware/checkUserPermission.js');
const validate = require('../middleware/requestValidator');
const schemas = require('../../validation/JoiSchemas');
const role = require('../../utils/roles');

// get shipper profile
router.get(
    '/shippers/:id',
    validate(schemas.routeId, 'params'),
    async (req, res) => {
      const shipperId = req.params.id;
      try {
        const shipper = await ShipperService.getProfile(shipperId);
        if (!shipper) {
          return res.status(404).json({error: 'Not found'});
        }
        return res.status(200).json({shipper: shipper});
      } catch (err) {
        return res.status(500).json({error: err.message});
      }
    },
);

// delete shipper profile
router.delete(
    '/shippers/:id',
    validate(schemas.routeId, 'params'),
    checkPermission(role.SHIPPER),
    async (req, res) => {
      const shipperId = req.params.id;
      try {
        const deletedShipper = await ShipperService.deleteShipper(shipperId);
        if (!deletedShipper) {
          return res.status(404).json({error: 'Not found'});
        }
        return res
            .status(200)
            .json({message: 'Shipper was successfully deleted'});
      } catch (err) {
        res.status(500).json({error: err.message});
      }
    },
);

// create load
router.post(
    '/shippers/:id/loads',
    validate(schemas.routeId, 'params'),
    checkPermission(role.SHIPPER),
    validate(schemas.createLoad, 'body'),
    async (req, res) => {
      const shipperId = req.params.id;
      const loadInfo = req.body;

      try {
        const newLoad = await ShipperService.createLoad(shipperId, loadInfo);
        return res.status(201).json({load: newLoad});
      } catch (err) {
        return res.status(500).json({error: err.message});
      }
    },
);

// update load
router.put(
    '/shippers/:id/loads/:sid',
    validate(schemas.routeIds, 'params'),
    checkPermission(role.SHIPPER),
    validate(schemas.updateLoad, 'body'),
    async (req, res) => {
      const loadId = req.params.sid;
      const body = req.body;
      const infoToUpdate = {};

      for (const property in body) {
        if (body[property]) {
          infoToUpdate[property] = body[property];
        }
      }

      try {
        const updatedLoad = await ShipperService.updateLoad(loadId, infoToUpdate);
        if (!updatedLoad) {
          return res.status(404).json({error: 'Load not found'});
        }
        return res.status(200).json({load: updatedLoad});
      } catch (err) {
        if (err.name === 'ServerError') {
          return res.status(500).json({error: err.message});
        }
        return res.status(400).json({error: err.message});
      }
    },
);

// delete load
router.delete(
    '/shippers/:id/loads/:sid',
    validate(schemas.routeIds, 'params'),
    checkPermission(role.SHIPPER),
    async (req, res) => {
      const loadId = req.params.sid;
      try {
        const deletedLoad = await ShipperService.deleteLoad(loadId);
        if (!deletedLoad) {
          return res.status(404).json({error: 'Load not found'});
        }
        return res.status(200).json({message: 'Load was successfully deleted'});
      } catch (err) {
        return res.status(500).json({error: err.message});
      }
    },
);

// post load
router.post(
    '/shippers/:id/loads/:sid',
    validate(schemas.routeIds, 'params'),
    checkPermission(role.SHIPPER),
    async (req, res) => {
      const loadId = req.params.sid;

      try {
        await ShipperService.postLoad(loadId);
        return res
            .status(200)
            .json({message: 'Load was successfully posted. Driver is assigned.'});
      } catch (err) {
        if (err.name === 'ServerError') {
          return res.status(500).json({error: err.message});
        }
        return res.status(404).json({error: err.message});
      }
    },
);

// get shipping info
router.get(
    '/shippers/:id/loads/:sid/logs',
    validate(schemas.routeIds, 'params'),
    checkPermission(role.SHIPPER),
    async (req, res) => {
      const loadId = req.params.sid;
      try {
        const logs = await ShipperService.getShippingInfo(loadId);
        if (!logs) {
          return res.status(404).json({error: 'Load not found'});
        }
        return res.status(200).json({logs: logs});
      } catch (err) {
        return res.status(500).json({error: err.message});
      }
    },
);

// get list of loads
router.get(
    '/shippers/:id/loads/(:query)?',
    validate(schemas.routeId, 'params'),
    validate(schemas.loadsQuery, 'query'),
    checkPermission(role.SHIPPER),
    async (req, res) => {
      const shipperId = req.params.id;
      const statusFilter = req.query.filter || '';

      try {
        const loads = await ShipperService.getLoadsList(shipperId, statusFilter);
        return res.status(200).json({loads: loads});
      } catch (err) {
        return res.status(500).json({error: err.message});
      }
    },
);
module.exports = router;
