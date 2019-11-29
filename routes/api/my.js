//https://medium.com/nuances-of-programming/%D1%83%D1%87%D0%B8%D0%BC%D1%81%D1%8F-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D1%82%D1%8C-%D1%81-%D0%B0%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D0%B5%D0%B9-%D0%B2-node-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D1%8F-passport-js-58c14b9fe823
const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('User');


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

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);
  return finalUser.save()
    .then(function (product) {
      console.log('---------------  - -  - - --  product', product)
    })
    .catch((json) => res.json({ user: json }))
    .then(() => finalUser.toAuthJSON())
  //.then((json) => res.json({ user: json }));
  /*
    return finalUser.save()
      .then(() => res.json({ user: finalUser.toAuthJSON() }));
      */
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
    /*
        if (passportUser) {
      const user = passportUser;
      return passportUser.generateJWT()
        .then((token) => {
          user.token = token;
          return user.toAuthJSON().then((json) => res.json({ user: json }));
        });
    }*/

    return res.status(400).info;
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { sub } } = req;
  console.log(req)

  return Users.findById(sub)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400);
      }

      return user.toAuthJSON()
        .then((json) => res.json({ user: json }));
    });
});

module.exports = router;
