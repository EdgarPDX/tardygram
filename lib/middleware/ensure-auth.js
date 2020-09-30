const UserService = require('../services/user-service');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.cookieCrumble;

    const user = UserService.verifyToken(token);

    req.user = user;

    next();
  } catch(error) {
    next(error);
  }
  


};
