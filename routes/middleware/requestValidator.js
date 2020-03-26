const validate = (schema, property) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req[property]);
      next();
    } catch (err) {
      return res.status(400).json({error: err.message});
    }
  };
};

module.exports = validate;
