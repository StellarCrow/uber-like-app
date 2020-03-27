const jwt = require('jsonwebtoken');
const secret = require('config').jwt_secret;

module.exports = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(401).json({message: 'Unauthorized user'});
  }

  const jwtToken = req.headers['authorization'].split(' ')[1];
  try {
    const user = jwt.verify(jwtToken, secret);
    req.jwtUser = user;
  } catch (err) {
    return res.status(401).json({message: 'Unauthorized user'});
  }

  next();
};
