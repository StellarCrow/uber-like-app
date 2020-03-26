const checkRole = (role) => {
  return async (req, res, next) => {
    const user = req.user;
    if (user.role === role) {
      next();
    } else {
      return res.status(403).json({error: 'Forbidden'});
    }
  };
};

module.exports = checkRole;
