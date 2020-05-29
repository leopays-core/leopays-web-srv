const cfg = require('../cfg');
const redis = require('redis');
const connectRedis = require('connect-redis');
const logger = require('../../config/logger').getLogger('session_store');



module.exports = (session) => {
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient()
    .on('ready', (sessionId) => logger.info('ready'))
    .on('connect', (sessionId) => logger.info('connect'))
    .on('reconnecting', (sessionId) => logger.info('reconnecting', sessionId))
    .on('error', (sessionId) => logger.info('error', sessionId))
    .on('end', (sessionId) => logger.info('end', sessionId))
    .on('warning', (sessionId) => logger.info('warning', sessionId));

  return new RedisStore({
    client: redisClient,
    prefix: 'srv', // Key prefix in Redis(default: sess:). This prefix appends to whatever prefix you may have set on the client itself.

    //ttl: 86400, // If the session cookie has a expires date, connect - redis will use it as the TTL. Otherwise, it will expire the session using the ttl option(default: 86400 seconds or one day).

    //disableTouch: false, // Disables re-saving and resetting the TTL when using touch (default: false)
    //serializer: JSON, // The encoder/decoder to use when storing and retrieving session data from Redis (default: JSON).
    //scanCount: 1000, // Value used for count parameter in Redis SCAN command. Used for ids() and all() methods (default: 100).
  });
}
