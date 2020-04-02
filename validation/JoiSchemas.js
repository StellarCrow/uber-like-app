const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const {loadStateEnum}= require('../utils/loadConstants');
const {truckTypesEnum}= require('../utils/truckConstants');

const schemas = {
  registration: Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string().required(),
    role: Joi.string()
        .valid('driver', 'shipper')
        .required(),
  }),
  authorization: Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string().required(),
  }),
  passwordUpdate: Joi.object({
    password: Joi.string().required(),
  }),
  routeId: Joi.object({
    id: Joi.objectId().required(),
  }),
  routeIds: Joi.object({
    id: Joi.objectId().required(),
    sid: Joi.objectId().required(),
  }),
  createTruck: Joi.object({
    name: Joi.string().required(),
    type: Joi.any().valid(...truckTypesEnum).required(),
  }),
  truckUpdate: Joi.object({
    name: Joi.string().required(),
  }),
  createLoad: Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    status: Joi.string().pattern(/NEW/).required(),
    dimensions: Joi.object({
      width: Joi.number().required(),
      length: Joi.number().required(),
      height: Joi.number().required(),
    }).required(),
    payload: Joi.number().required(),
    deliveryAddress: Joi.object({
      city: Joi.string().required(),
      street: Joi.string().required(),
      zip: Joi.string().length(5).required(),
    }).required(),
    pickUpAddress: Joi.object({
      city: Joi.string().required(),
      street: Joi.string().required(),
      zip: Joi.string().length(5).required(),
    }).required(),
  }),
  updateLoad: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    dimensions: Joi.object({
      width: Joi.number().required(),
      length: Joi.number().required(),
      height: Joi.number().required(),
    }),
    payload: Joi.number(),
    deliveryAddress: Joi.object({
      city: Joi.string().required(),
      street: Joi.string().required(),
      zip: Joi.string().length(5).required(),
    }),
    pickUpAddress: Joi.object({
      city: Joi.string().required(),
      street: Joi.string().required(),
      zip: Joi.string().length(5).required(),
    }),
  }),
  changeLoadStatus: Joi.object({
    state: Joi.any().valid(...loadStateEnum).required(),
  }),
};

module.exports = schemas;
