const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

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
  routeId: Joi.object({
    id: Joi.objectId().required(),
  }),
  routeIds: Joi.object({
    id: Joi.objectId().required(),
    sid: Joi.objectId().required(),
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
};

module.exports = schemas;
