const jwt = require('express-jwt');
const cfg = require('../config');


const types = ['JWT']; // ['Bearer', 'Token', 'JWT']

function fromHeaderOrQuerystring(req) {
  const { headers: { authorization }, query } = req;

  if (authorization && types.includes(authorization.split(' ')[0])) {
    return authorization.split(' ')[1];
  } else if (query && query.token) {
    return query.token;
  }
  return null;
}


function secretCallback(req, payload, done) {
  function getSecret(issuer, cb) {
    const error = null;
    const secret = cfg.get('jwt.secret');
    return cb(error, secret);
  }

  const issuer = payload.iss;

  getSecret(issuer, (error, secret) => {
    if (error) return done(error);
    if (!secret) return done(new Error('missing_secret'));
    done(null, secret);
  });
}

/**
 * Checking the token for the need to revoke.
 * @param {Object} req - The express request object.
 * @param {Object} payload - An object with the JWT claims.
 * @param {Function} done - A function with signature function(err, revoked) to be invoked once the check to see if the token is revoked or not is complete.
 * @param {Any} done[0] err - The error that occurred.
 * @param {Boolean} done[1] revoked - true if the JWT is revoked, false otherwise.
**/
function isRevokedCallback(req, payload, done) {
  const issuer = payload.iss;
  const tokenId = payload.jti;
  return done(null, false); //!?

  data.getRevokedToken(issuer, tokenId, function (err, token) {
    if (err) { return done(err); }
    return done(null, false);
  });
};

const auth = {
  required: jwt({
    secret: secretCallback,
    getToken: fromHeaderOrQuerystring,
    isRevoked: isRevokedCallback,
    //audience: 'https://milliard.money/protected',
    //issuer: 'https://milliard.money/',
    userProperty: 'jwt', // 'user',
  }).unless({ path: [] }),
  optional: jwt({
    secret: secretCallback,
    getToken: fromHeaderOrQuerystring,
    isRevoked: isRevokedCallback,
    //audience: 'https://milliard.money/protected',
    //issuer: 'https://milliard.money/',
    userProperty: 'jwt', // 'user',
    credentialsRequired: false,
  }).unless({ path: [] }),
};

module.exports = auth;
