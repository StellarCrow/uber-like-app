const Joi = require('@hapi/joi');

/** Class representing Joi schemes for request validation */
class JoiSchema {
  /**
   * Registrate user.
   * @param {object} user - user's credentials for registration.
   * @return {Promise} Promise object represents new user.
   */
  registration() {
    return Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.string().valid('driver', 'shipper').required(),
    });
  }
}

module.exports = new JoiSchema();
