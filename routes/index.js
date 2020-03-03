const express = require('express');
const router = express.Router();


router.use('/', require('./home'));
router.use('/download', require('./download'));
router.use('/explorer', require('./explorer'));
router.use('/privacy', require('./privacy'));
router.use('/terms', require('./terms'));
// https://auth0.com/docs
router.use('/.well-known', require('./.well-known'));

//router.use('/auth', require('./auth'));
router.use('/api', require('./api'));

module.exports = router;
