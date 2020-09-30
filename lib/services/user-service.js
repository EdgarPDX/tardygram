const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const create = async({ email, password, profilePhotoURL }) => {
  const passwordHash = await bcrypt.hash(password, 13);
  const user = await User.insert({ email, passwordHash, profilePhotoURL });

  return user;

};

const authorize = async({ email, password }) => {
  const user = await User.findByEmail(email);
  if(!user) throw new Error('Invalid email/password');

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if(!passwordMatch) throw new Error('Invalid email/password');

  return user;
};

const makeToken = user => {
  const token = jwt.sign(user.toJSON(), process.env.APP_SECRET, {
    expiresIn: '1d'  
  });

  return token;
};

const verifyToken = token => {
  const user = jwt.verify(token, process.env.App_SECRET);
  return user;
};

module.exports = {
  create,
  makeToken,
  authorize,
  verifyToken
};
