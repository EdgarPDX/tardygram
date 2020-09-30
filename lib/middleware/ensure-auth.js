const UserService = require('../services/user-service');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.cookieCrumble;

    const payload = UserService.verifyToken(token);

    req.user = {
      userId: payload.userId,
      email: payload.email,
      profilePhotoURL: payload.profilePhotoURL
    };

    next();
  } catch(error) {
    next(error);
  }
  


};
