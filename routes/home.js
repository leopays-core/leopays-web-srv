const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {

  console.log('GET home page', req.t);
  res.render('index', {
    lang: req.language,
    title: req.t('title'),
    description: req.t('description'),
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
