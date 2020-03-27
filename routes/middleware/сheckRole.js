const checkRole = (role) => {
  return async (req, res, next) => {
    const user = req.jwtUser;
    if (user.role !== role) {
      return res.status(403).json({error: 'Forbidden'});
    }

    next();
  };
};

module.exports = checkRole;
