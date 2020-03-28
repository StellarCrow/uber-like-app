const express = require('express');
const router = new express.Router();
const ShipperService = require('../../services/ShipperService');
const checkPermission = require('../middleware/checkUserPermission.js');
const validate = require('../middleware/requestValidator');
const schemas = require('../../validation/JoiSchemas');
const role = require('../../utils/roles');

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
      const loadInfo = {
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        dimensions: req.body.dimensions,
        payload: req.body.payload,
        deliveryAddress: req.body.deliveryAddress,
        pickUpAddress: req.body.pickUpAddress,
      };

      try {
        const newLoad = await ShipperService.createLoad(shipperId, loadInfo);
        return res.status(201).json({load: newLoad});
      } catch (err) {
        return res.status(500).json({error: err.message});
      }
    },
);

module.exports = router;
