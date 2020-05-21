const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('index', {
    lang: req.language,
    title: `${req.t('Official projName Support', { projName: req.t('projName') })}`,
    description: req.t('Support Description', { projName: req.t('projName') }),
    noscript: req.t('noscript'),
  });
});

module.exports = router;
