const Joi = require('@hapi/joi');

/** Class representing Joi schemes for request validation */
class JoiSchema {
  /**
   * Registrate user.
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

  /**
   * Sign in user.
   * @return {Promise} Promise object represents new user.
   */
  authorization() {
    return Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
  }
}

module.exports = new JoiSchema();
