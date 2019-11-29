// src/18n/logger.js
const logger = require('../config/logger').getLogger('i18n');

module.exports = {
  type: 'logger',

  log: (args) => { logger.debug(args) },
  warn: (args) => { logger.warn(args) },
  error: (args) => { logger.error(args) },
}
