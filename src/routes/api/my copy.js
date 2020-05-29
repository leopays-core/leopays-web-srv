const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const User = mongoose.model('User');
/*
    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      return passportUser.generateJWT().then((token) => {
        user.token = token;
        return user.toAuthJSON().then((json) => res.json({ user: json }));
      });

    }
    */

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new User(Object.assign({}, user, { 'email.value': user.email }));
  //const finalUser = new User(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(finalUser.toAuthJSON)
    .then((json) => res.json({ user: json }));
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});

//GET current route (required, only authenticated User have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;
  console.log('id', id)

  return User.findById(id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;
