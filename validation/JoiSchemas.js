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
};

module.exports = schemas;
