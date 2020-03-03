// https://auth0.com/docs
// https://auth0.com/docs/jwks
// https://auth0.com/docs/tokens/reference/jwt/jwks-properties
const express = require('express');
const router = express.Router();

router.use('/jwks.json', require('./jwks'));
router.use('/openid-configuration', require('./openid-configuration'));
router.use('/acme-challenge', require('./acme-challenge'));

module.exports = router;
