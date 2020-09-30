const UserService = require('../services/user-service');

module.exports = (req, res, next) => {
  const token = req.cookies.cookieCrumble;

  const user = UserService.verifyToken(token);

  req.user = user;

  next();


};
