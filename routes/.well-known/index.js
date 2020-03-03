// https://auth0.com/docs
// https://auth0.com/docs/jwks
// https://auth0.com/docs/tokens/reference/jwt/jwks-properties
const express = require('express');
const router = express.Router();

router.use('/jwks.json', require('./jwks'));
router.use('/openid-configuration', require('./openid-configuration'));
router.use('/acme-challenge', require('./acme-challenge'));

'/acme-challenge/7gqsQSvU8jE29zyqP0xISJztw_vBjXzvz1D_oN_X99g'
module.exports = router;
/*
Create a file containing just this data:

7gqsQSvU8jE29zyqP0xISJztw_vBjXzvz1D_oN_X99g.pZ3vjRmDs3wFsuLlAKMfECnOxFhl4Hwg2TDAw_0oKBE

And make it available on your web server at this URL:

http://testnet.milliard.money/.well-known/acme-challenge/7gqsQSvU8jE29zyqP0xISJztw_vBjXzvz1D_oN_X99g
*/