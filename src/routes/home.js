const express = require('express');
const router = express.Router();



router.get('/', (req, res, next) => {
  /*
  if (!req.session.views)
    req.session.views = {};

  if (req.session.views['/'])
    req.session.views['/']++;
  else
    req.session.views['/'] = 1;
  */

  res.render('index', {
    lang: req.language,
    title: req.t('title'),
    description: req.t('description', { projName: req.t('projName') }),
    noscript: req.t('noscript'),
  });
});

const publicHandler = (req, res, next) => {
  console.log('publicHandler', req.t);
  next();
}
const privatHandler = (req, res, next) => {
  console.log('privatHandler');
  next();
}
const errorHandler = (req, res, next) => {
  console.log('errorHandler');
  next();
}

const handlers = [
  //auth.optional, 
  publicHandler,
  //auth.required, 
  privatHandler,
  errorHandler
];
router.post('/', handlers);

module.exports = router;
