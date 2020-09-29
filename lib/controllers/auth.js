const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


module.exports = Router()
  .post('/signup', async(req, res, next) => {
    const passwordHash = await bcrypt.hash(req.body.password, 13);
    User
      .insert({ email:req.body.email, passwordHash, profilePhotoURL: req.body.profilePhotoURL })
      .then(user => res.send(user))
      .catch(next);
  })
;
