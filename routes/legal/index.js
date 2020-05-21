const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('index', {
    lang: req.language,
    title: `${req.t('title')} - ${req.t('Legal')}`,
    description: req.t('Legal Description'),
    noscript: req.t('noscript'),
  });
});

router.get('/privacy', (req, res, next) => {
  res.render('index', {
    lang: req.language,
    title: `${req.t('title')} - ${req.t('Legal')} - ${req.t('Privacy Policy')}`,
    description: req.t('Privacy Policy Description', { projName: req.t('projName') }),
    noscript: req.t('noscript'),
  });
});
router.get('/privacy/cookies', (req, res, next) => {
  res.render('index', {
    lang: req.language,
    title: `${req.t('title')} - ${req.t('Legal')} - ${req.t('Privacy Policy')} - ${req.t('Cookies')}`,
    description: req.t('Cookies Description'),
    noscript: req.t('noscript'),
  });
});

router.get('/terms', (req, res, next) => {
  res.render('index', {
    lang: req.language,
    title: `${req.t('title')} - ${req.t('Legal')} - ${req.t('Terms')}`,
    description: req.t('Terms Description', { projName: req.t('projName') }),
    noscript: req.t('noscript'),
  });
});

module.exports = router;
