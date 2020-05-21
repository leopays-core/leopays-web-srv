/**
 * A simple application for redirecting HTTP & without WWW requests in production mode.
 * 
 * The HTTP response status code 301 Moved Permanently is used for permanent 
 * URL redirection, meaning current links or records using the URL that 
 * the response is received for should be updated. The new URL should be 
 * provided in the Location field included with the response.
 * 
 * @module /app-redirect
**/

const createError = require('http-errors');
const hbs = require('hbs');
const express = require('express');
const helmet = require('helmet');
//const cors = require('cors');
const { connectLogger } = require('log4js');
const cfg = require('../config/cfg');
const logger = require('../config/logger').getLogger('app-redirect');
const redirect = require('../lib/redirect').https_www_redirect;


const app = express();
hbs.localsAsTemplateData(app);
app.locals.layout = 'layout'; //'layout-for-react-app';
app.locals.lang = 'en';
app.locals.title = 'LeoPays';
app.locals.description = 'LeoPays - An open source smart contract platform.';
app.locals.noscript = 'You need to enable JavaScript to run this app.';

app.use(helmet());
//app.use(cors());
app.use(connectLogger(logger));
app.use(
  redirect({
    https: { redirect: cfg.get('server.https_redirect'), code: 301 },
    www: { redirect: cfg.get('server.www_redirect'), code: 301 },
  })
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  const message = err.message;
  const error = app.get('env') === 'development' ? err : {};
  // render the error page
  const status = err.status || 500;
  res.status(status);
  res.render('error', {
    layout: 'layout',
    title: `${message} | ${app.locals.title}`,
    description: `${message} | ${app.locals.title}`,
    message: message,
    error: error,
  });
  logger.error('Error:', status, '-', message, '-', error);
});

module.exports = app;
