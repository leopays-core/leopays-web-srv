// https://auth0.com/docs/jwks
// https://auth0.com/docs/tokens/reference/jwt/jwks-properties
const express = require('express');
const router = express.Router();



router.get('/', (req, res, next) => {
  const jwks = {
    keys: [],
  }
  res.json(jwks);
});

module.exports = router;
