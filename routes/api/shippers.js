const express = require('express');
const router = new express.Router();
const ShipperService = require('../../services/ShipperService');
const checkPermission = require('../middleware/checkUserPermission.js');
const validate = require('../middleware/requestValidator');
const schemas = require('../../validation/JoiSchemas');

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

module.exports = router;
