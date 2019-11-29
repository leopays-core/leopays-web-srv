const passport = require('../passport');
const express = require('express');
const router = express.Router();
//https://www.jsonrpc.org/specification
const ResponseObject = {
  jsonrpc: "2.0",
  ok: true,//
  result: {},
  //error: {code: 0, message: '', data: {},},
  id: null,
}
const RequestObject = {
  jsonrpc: "2.0",
  method: "",
  params: {},
  id: null,
}

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    lang: req.language,
    title: req.t('srv-main:proName'),
    description: req.t('srv-main:proName'),
    noscript: req.t('srv-main:noscript'),
  });
});

router.get('/login',
  (req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    res.render('index', {
      lang: req.language,
      title: req.t('srv-main:proName'),
      description: req.t('srv-main:proName'),
      noscript: req.t('srv-main:noscript'),
    });
  });

//passport.authenticate('local', { failureRedirect: '/login' }),
router.post('/login',
  passport.authenticate('local'),
  (req, res, next) => {
    console.log(req.session);
    let responseJson = {
      id: '_id',//user.id,
      username: 'username',//user.username,
      firstName: 'firstName',//user.firstName,
      lastName: 'lastName',//user.lastName,
      token: 'fake-jwt-token'
    };
    res.json({ ok: true, result: responseJson });
    res.status(200);
    /*
    console.log(req.session);
    res.redirect('/');
    */
  }
);

router.get('/logout',
  (req, res, next) => {
    req.logout();
    res.redirect('/');
  }
);

/*
log out
req.session.destroy(function(err) {
  // cannot access session here
})
*/
/*
app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  }
);
*/
module.exports = router;
