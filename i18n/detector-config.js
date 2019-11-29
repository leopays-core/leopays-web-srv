// src/18n/detector-config.js
module.exports = {
  // order and from where user language should be detected
  order: ['path'],//['path' 'path', 'session', 'querystring', 'cookie', 'header' ],

  // keys or params to lookup language from
  //lookupQuerystring: 'lng',
  lookupCookie: 'lng',
  //lookupHeader: 'accept-language',
  //lookupSession: 'lng',
  //lookupPath: 'lng',
  lookupFromPathIndex: 0,

  // cache user language
  caches: false, //false, // ['cookie']

  // optional expire and domain for set cookie
  //cookieExpirationDate: new Date(),
  //cookieDomain: 'myDomain',
  //cookieSecure: true, // if need secure cookie
};
