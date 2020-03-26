const Joi = require('@hapi/joi');

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
};

module.exports = schemas;
