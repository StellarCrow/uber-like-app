const checkPermission = (role) => {
  return async (req, res, next) => {
    if (!req.jwtUser) {
      return res.status(403).json({error: 'Forbidden'});
    }
    if (role !== req.jwtUser.role) {
      return res.status(403).json({error: 'Forbidden'});
    }
    const userAuthorized = req.jwtUser.id;
    const user = req.params.id;
    if (user !== userAuthorized) {
      return res.status(403).json({error: 'Forbidden'});
    }

    next();
  };
};

module.exports = checkPermission;
