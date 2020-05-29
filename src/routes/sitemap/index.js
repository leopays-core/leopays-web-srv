const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('index', {
    lang: req.language,
    title: `${req.t('Site Map')}`,
    description: req.t('Site Map Description'),
    noscript: req.t('noscript'),
  });
});

module.exports = router;
