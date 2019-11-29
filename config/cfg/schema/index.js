const env = require('./env');
const data = require('./data');
const config = require('./config');
const db = require('./db');
const jwt = require('./jwt');
const links = require('./links');
const logger = require('./logger');
const passport = require('./passport');
const server = require('./server');
const session = require('./session');


// Define a schema
const schema = Object.assign(
  {},
  { /* */ },
  env,
  data,
  config,
  db,
  jwt,
  links,
  logger,
  passport,
  server,
  session,
);

module.exports = schema;
