const i18next = require('i18next');
const { LanguageDetector } = require("i18next-express-middleware");
const FilesystemBackend = require('i18next-node-fs-backend');
const sprintf = require('i18next-sprintf-postprocessor');
const i18nextConfig = require('./i18next-config');
const i18nextLogger = require('./logger');

i18next
  .use(LanguageDetector)
  .use(FilesystemBackend)
  .use(sprintf)
  .use(i18nextLogger)
  .init(i18nextConfig);

module.exports = i18next;
