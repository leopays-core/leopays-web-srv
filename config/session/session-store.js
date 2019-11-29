const cfg = require('../cfg');
const { connectDb } = require('../mongodb');
const logger = require('../../config/logger').getLogger('session_store');
const connectMongo = require('connect-mongo');


module.exports = (session) => {
  const MongoStore = connectMongo(session);
  return new MongoStore({
    clientPromise: connectDb(),
    secret: cfg.get('session.store.secret'),
  })
    .on('create', (sessionId) => logger.info('create', sessionId))
    .on('touch', (sessionId) => logger.info('touch', sessionId))
    .on('update', (sessionId) => logger.info('update', sessionId))
    .on('set', (sessionId) => logger.info('set', sessionId))
    .on('destroy', (sessionId) => logger.info('destroy', sessionId));
};
