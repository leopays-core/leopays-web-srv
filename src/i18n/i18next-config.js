const path = require('path');
const detectorConfig = require('./detector-config.js');



const isProd = process.env.NODE_ENV === "production";

module.exports = {
  lng: "en",
  language: null,
  fallbackLng: "en",
  whitelist: ['en', 'ru'],
  nonExplicitWhitelist: false, // if true: 'en-US' as 'en'
  preload: ['en', 'ru'],
  ns: [
    'srv-common', 'srv-error'
  ],
  defaultNS: 'srv-common',  // default namespace (needs no prefix on calling t)
  //fallbackNS: 'srv-common', // fallback, can be a string or an array of namespaces
  //nsSeparator: true,  // ':'
  //keySeparator: true, // '.'

  debug: isProd ? true : false,
  saveMissing: true,
  detection: detectorConfig,
  backend: {
    loadPath: path.join(__dirname, '../public', '/static/locales/{{lng}}/{{ns}}.json'),
    addPath: path.join(__dirname, '../public', '/static/locales/{{lng}}/{{ns}}.missing.json'),
  },
};
