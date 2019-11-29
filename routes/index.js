const express = require('express');
const router = express.Router();


router.use('/', require('./home'));
// https://auth0.com/docs
//router.use('/.well-known', require('./.well-known'));

//router.use('/auth', require('./auth'));
router.use('/api', require('./api'));

module.exports = router;
