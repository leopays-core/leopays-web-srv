// https://auth0.com/docs/jwks
// https://auth0.com/docs/tokens/reference/jwt/jwks-properties
// https://kjur.github.io/jsrsasign/api/symbols/KEYUTIL.html

const fs = require('fs');
const path = require('path');
const cfg = require('../cfg');
const rsu = require('jsrsasign-util');
//const rs = require('jsrsasign');
const { KEYUTIL, KJUR } = require('jsrsasign');


/*
let key = {
  kp: {},
  jwk: {},
  pem: {},
};
const pubKeyFile = '';
const privKeyFile = '';
key = makeKeysFromFiles(pubKeyFile, privKeyFile);

const dataDir = cfg.get('data.dir');

fs.writeFileSync(path.resolve(__dirname, dataDir, 'prvKeyObj.prod.json'), JSON.stringify(key.kp.prvKeyObj, null, 2))
fs.writeFileSync(path.resolve(__dirname, dataDir, 'pubKeyObj.prod.json'), JSON.stringify(key.kp.pubKeyObj, null, 2))

fs.writeFileSync(path.resolve(__dirname, dataDir, 'prv.key.prod.jwk'), JSON.stringify(key.jwk.prv, null, 2))
fs.writeFileSync(path.resolve(__dirname, dataDir, 'pub.key.prod.jwk'), JSON.stringify(key.jwk.pub, null, 2))

fs.writeFileSync(path.resolve(__dirname, dataDir, 'prv.key.prod.pem'), key.pem.prv)
fs.writeFileSync(path.resolve(__dirname, dataDir, 'pub.key.prod.pem'), key.pem.pub)
*/

/*
const kp = {
  prvKeyObj: {},
  pubKeyObj: {},
};
const pubKeyFile = '';
const privKeyFile = '';
kp.pubKeyObj = KEYUTIL.getKey(rsu.readFile(pubKeyFile));
kp.prvKeyObj = KEYUTIL.getKey(rsu.readFile(privKeyFile));

const jwk = {
  prv: {},
  pub: {},
};

jwk.prv = KEYUTIL.getJWKFromKey(kp.prvKeyObj);
jwk.prv.kid = KJUR.jws.JWS.getJWKthumbprint(jwk.prv);
jwk.pub = KEYUTIL.getJWKFromKey(kp.pubKeyObj);
jwk.pub.kid = KJUR.jws.JWS.getJWKthumbprint(jwk.pub);
console.log('jwk.prv.kid ', jwk.prv.kid);
fs.writeFileSync(path.resolve(__dirname, 'key.json'), JSON.stringify(jwk.pub));
*/

/**
 * This method generates a key pair of public key algorithm.
 * https://kjur.github.io/jsrsasign/api/symbols/KEYUTIL.html#.generateKeypair
 * 
 * @return {Object} obj Длина окружности.
 * @return {Object} obj.prvKeyObj - RSAKey object of private key.
 * @return {Object} obj.pubKeyObj - RSAKey object of public key.
**/
function generateKeypair() {
  const kp = KEYUTIL.generateKeypair("RSA", 2048);
  return kp;
}
module.exports.generateKeypair = generateKeypair;

/**
 * https://kjur.github.io/jsrsasign/api/symbols/KEYUTIL.html#.getJWKFromKey
 * @param {prvKeyObj|pubKeyObj} KeyObj
 * @return {Object} jwk - jwk.
**/
function getJWKFromKey(KeyObj) {
  // https://auth0.com/docs/tokens/reference/jwt/jwks-properties
  const jwk = KEYUTIL.getJWKFromKey(KeyObj);
  jwk.kid = KJUR.jws.JWS.getJWKthumbprint(jwk);
  jwk.alg = "RS256";
  jwk.kty = "RSA";
  jwk.use = "sig";
  jwk.x5c = undefined; // !?
  jwk.x5t = undefined; // !?
  return jwk;
}
module.exports.getJWKFromKey = getJWKFromKey

function getJWK(kp) {
  const jwk = {
    prv: {},
    pub: {},
  };
  jwk.prv = getJWKFromKey(kp.prvKeyObj);
  jwk.pub = getJWKFromKey(kp.pubKeyObj);
  return jwk;
}
module.exports.getJWK = getJWK;

/**
 * https://kjur.github.io/jsrsasign/api/symbols/KEYUTIL.html#.getPEM
 * @param {*} kp 
**/
function getPEM(kp) {
  const pem = {
    prv: {},
    pub: {},
  };
  pem.prv = KEYUTIL.getPEM(kp.prvKeyObj, "PKCS8PRV"); //, "PKCS1PRV PKCS5PRV PKCS8PRV", "passw");
  pem.pub = KEYUTIL.getPEM(kp.pubKeyObj);
  return pem;
}
module.exports.getPEM = getPEM;

function makeNewKey() {
  const kp = generateKeypair();
  const jwk = getJWK(kp);
  const pem = getPEM(kp);
  const key = {
    kp: kp,
    jwk: jwk,
    pem: pem,
  };
  return key;
}
module.exports.makeNewKey = makeNewKey;



function getKeysFormFile(pubKeyFile, privKeyFile) {
  const kp = {
    prvKeyObj: {},
    pubKeyObj: {},
  };
  kp.pubKeyObj = KEYUTIL.getKey(rsu.readFile(pubKeyFile));
  kp.prvKeyObj = KEYUTIL.getKey(rsu.readFile(privKeyFile));
  return kp;
}
module.exports.getKeysFormFile = getKeysFormFile;

function makeKeysFromFiles(pubKeyFile, privKeyFile) {
  const kp = getKeysFormFile(pubKeyFile, privKeyFile);
  const jwk = getJWK(kp);
  const pem = getPEM(kp);
  const key = {
    kp: kp,
    jwk: jwk,
    pem: pem,
  };
  return key;
}
module.exports.makeKeysFromFiles = makeKeysFromFiles;

