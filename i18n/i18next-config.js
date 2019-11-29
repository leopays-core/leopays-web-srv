// src/18n/i18next-config.js
const path = require('path');
const detectorConfig = require('./detector-config.js');

module.exports = {
  //lng: (process.env.NODE_ENV !== "production") ? 'ru' : 'en',
  fallbackLng: (process.env.NODE_ENV !== "production") ? 'ru' : 'en',
  whitelist: ['en', 'ru'],
  nonExplicitWhitelist: false, // if true: 'en-US' as 'en'
  preload: ['en', 'ru'],
  ns: [
    'srv-main', 'srv-error'
  ],
  //defaultNS: 'srv-main',  // default namespace (needs no prefix on calling t)
  //fallbackNS: 'srv-main', // fallback, can be a string or an array of namespaces
  //nsSeparator: true,  // ':'
  //keySeparator: true, // '.'

  debug: (process.env.NODE_ENV !== "production") ? true : false,
  saveMissing: true,
  detection: detectorConfig,
  backend: {
    loadPath: path.join(__dirname, '../public/', '/static/locales/{{lng}}/{{ns}}.json'),
    addPath: path.join(__dirname, '../public/', '/static/locales/{{lng}}/{{ns}}.missing.json'),
  },
};
