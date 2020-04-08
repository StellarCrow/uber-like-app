const express = require('express');
const router = new express.Router();
const ShipperService = require('../../services/ShipperService');
const checkPermission = require('../middleware/checkUserPermission.js');
const validate = require('../middleware/requestValidator');
const schemas = require('../../validation/JoiSchemas');
const role = require('../../utils/roles');

/**
 * @api {get} /api/shippers/:id Get shipper profile
 * @apiName GetShipper
 * @apiGroup Shippers
 *
 * @apiParam {String} id Shipper id
 *
 * @apiSuccess {Object} shipper full info about shipper profile.
 *
 * @apiError ServerError Server error
 * @apiError ShipperNotFound The <code>id</code> of the Shipper was not found.
 */

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

/**
 * @api {delete} /api/shippers/:id Delete shipper profile
 * @apiName DeleteShipper
 * @apiGroup Shippers
 *
 * @apiParam {String} id Shipper id
 *
 * @apiSuccess {String} message Shipper was successfully deleted.
 *
 * @apiError ServerError Server error
 * @apiError ShipperNotFound Not found
 */

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

/**
 * @api {post} /api/shippers/:id/loads Create new load
 * @apiName CreateLoad
 * @apiGroup Shippers
 *
 * @apiParam {String} id Shipper id
 *
 * @apiParam {String} name Load name
 * @apiParam {String} description Load description
 * @apiParam {String} description Load description
 * @apiParam {Object} dimensions Load dimensions
 * @apiParam {Number} dimensions.height Load height
 * @apiParam {Number} dimensions.width Load width
 * @apiParam {Number} dimensions.length Load length
 * @apiParam {Number} payload Load payload
 * @apiParam {Object} deliveryAddress Load delivery address
 * @apiParam {String} deliveryAddress.city delivery address city
 * @apiParam {String} deliveryAddress.street delivery address street
 * @apiParam {Number} deliveryAddress.zip delivery address zip code
 * @apiParam {Object} pickUpAddress Load pick up address
 * @apiParam {String} pickUpAddress.city pick up address city
 * @apiParam {String} pickUpAddress.street pick up address street
 * @apiParam {Number} pickUpAddress.zip pick up address zip code
 *
 *
 * @apiSuccess {Object} truck New created load.
 *
 * @apiError ServerError Server error
 */

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

/**
 * @api {put} /api/shippers/:id/loads/:sid Update load info
 * @apiName UpdateLoad
 * @apiGroup Shippers
 *
 * @apiParam {String} id Shipper id
 * @apiParam {String} id Load id
 *
 * @apiParam {String} name Load name
 * @apiParam {String} description Load description
 * @apiParam {String} description Load description
 * @apiParam {Object} dimensions Load dimensions
 * @apiParam {Number} dimensions.height Load height
 * @apiParam {Number} dimensions.width Load width
 * @apiParam {Number} dimensions.length Load length
 * @apiParam {Number} payload Load payload
 * @apiParam {Object} deliveryAddress Load delivery address
 * @apiParam {String} deliveryAddress.city delivery address city
 * @apiParam {String} deliveryAddress.street delivery address street
 * @apiParam {Number} deliveryAddress.zip delivery address zip code
 * @apiParam {Object} pickUpAddress Load pick up address
 * @apiParam {String} pickUpAddress.city pick up address city
 * @apiParam {String} pickUpAddress.street pick up address street
 * @apiParam {Number} pickUpAddress.zip pick up address zip code
 *
 * @apiSuccess {Object} load updated load instance.
 *
 * @apiError ServerError Server error
 * @apiError LoadStatusNotNew It is allowed to update loads only with status "NEW"
 * @apiError LoadNotFound Load not found
 */

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


/**
 * @api {delete} /api/shippers/:id/loads/:sid Delete load
 * @apiName DeleteLoad
 * @apiGroup Shippers
 *
 * @apiParam {String} id Shipper id
 * @apiParam {String} sid Load id
 *
 * @apiSuccess {String} message Load was successfully deleted
 *
 * @apiError ServerError Server error
 * @apiError LoadStatusNotNew It is allowed to delete loads only with status "NEW"
 * @apiError LoadNotFound Load not found
 */

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

/**
 * @api {post} /api/shippers/:id/loads/:sid Post load
 * @apiName PostLoad
 * @apiGroup Shippers
 *
 * @apiParam {String} id Shipper id
 * @apiParam {String} sid Load id
 *
 * @apiSuccess {String} message Load was successfully posted. Driver is assigned.
 *
 * @apiError ServerError Server error
 * @apiError DriverNotFound Driver not found. Load state changed to NEW.
 * @apiError LoadNotFound Load not found
 * @apiError LoadStatusNotNew It is allowed to post loads only with status "NEW"
 */

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

/**
 * @api {get} /api/shippers/:id/loads/:sid/logs Get shipping info
 * @apiName GetShippingInfo
 * @apiGroup Shippers
 *
 * @apiParam {String} id Shipper id
 * @apiParam {String} sid Load id
 *
 * @apiSuccess {Object[]} logs list of load's logs.
 *
 * @apiError ServerError Server error
 * @apiError LoadNotFound Load not found.
 */

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

/**
 * @api {get} /api/shippers/:id/loads/assigned Get list of loads that assigned to drivers
 * @apiName GetAssignedLoads
 * @apiGroup Shippers
 *
 * @apiParam {String} id Shipper id
 *
 * @apiSuccess {Object[]} loads list of loads that assigned to drivers.
 *
 * @apiError ServerError Server error
 */

router.get('/shippers/:id/loads/assigned',
    validate(schemas.routeId, 'params'),
    checkPermission(role.SHIPPER),
    async (req, res) => {
      const shipperId = req.params.id;
      try {
        const loads = await ShipperService.getAssignedLoads(shipperId);
        return res.status(200).json({loads});
      } catch (err) {
        return res.status(500).json({error: err.message});
      }
    });

/**
 * @api {get} /api/shippers/:id/loads/(:query)? Get list of all loads
 * @apiName GetLoads
 * @apiGroup Shippers
 *
 * @apiParam {String} id Shipper id
 * @apiParam {Object} query query params
 * @apiParam {String} query.filter load status for filtering loads
 * @apiParam {String} query.page page number for pagination
 *
 * @apiSuccess {Object[]} loads list of shipper's loads.
 * @apiSuccess {Object[]} meta additional data about load list.
 * @apiSuccess {Object[]} meta.pagination pagination info (currentPage, totalPages etc).
 * @apiSuccess {String} meta.filter load status for filtering on client side.
 *
 *  @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
    "meta": {
        "pagination": {
            "totalItems": 16,
            "currentPage": 1,
            "pageSize": 10,
            "totalPages": 2,
            "startPage": 1,
            "endPage": 2,
            "startIndex": 0,
            "endIndex": 9,
            "pages": [
                1,
                2
            ]
        },
        "filter": ""
    },
    "loads": [
        {
            "dimensions": {
                "width": 119,
                "height": 123,
                "length": 123
            },
            "...":"..."
 *
 * @apiError ServerError Server error
 */

router.get(
    '/shippers/:id/loads/(:query)?',
    validate(schemas.routeId, 'params'),
    validate(schemas.loadsQuery, 'query'),
    checkPermission(role.SHIPPER),
    async (req, res) => {
      const shipperId = req.params.id;
      const statusFilter = req.query.filter || '';
      const page = parseInt(req.query.page) || 1;

      try {
        const {loads, paginateInfo} = await ShipperService.getLoadsList(
            shipperId,
            statusFilter,
            page,
        );
        return res
            .status(200)
            .json({meta: {pagination: paginateInfo, filter: statusFilter}, loads});
      } catch (err) {
        return res.status(500).json({error: err.message});
      }
    },
);
module.exports = router;
