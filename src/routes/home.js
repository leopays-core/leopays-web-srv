const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('index', {
    lang: req.language,
    title: req.t('title'),
    description: req.t('description', { projName: req.t('projName') }),
    noscript: req.t('noscript'),
  });
});

module.exports = router;
