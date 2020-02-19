/**
 * Main application.
 * @module /app
**/

const path = require('path');
const createError = require('http-errors');
const hbs = require('hbs');
const express = require('express');
const helmet = require('helmet');
//const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { connectLogger } = require('log4js');
const i18next = require('../i18n');
const { handle, missingKeyHandler, getResourcesHandler } = require('i18next-express-middleware');
const cfg = require('../config/cfg');
const logger = require('../config/logger').getLogger('app');
const redirect = require('../lib/redirect').https_www_redirect;
const routes = require('../routes');
const models = require('../config/mongodb');
const session = require('../config/session');

const passport = require('../config/passport');


const app = express();

hbs.localsAsTemplateData(app);
app.locals.layout = 'layout-for-react-app';
app.locals.lang = 'ru';
app.locals.title = 'LeoPays';
app.locals.description = 'LeoPays';
app.locals.noscript = 'You need to enable JavaScript to run this app.';
//api/user/auth/...
app.use(helmet());
//app.use(cors());
app.use(connectLogger(logger));
app.use(
  redirect({
    https: { redirect: cfg.get('server.https_redirect'), code: 301 },
    www: { redirect: cfg.get('server.www_redirect'), code: 301 },
  })
);

// view engine setup
app.set('views', path.resolve(__dirname, '../views'));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session());
app.use(express.static(path.resolve(__dirname, '../react-app')));
app.use(express.static(path.resolve(__dirname, '../public')));

app.use(handle(i18next, {
  ignoreRoutes: ['/api'], // or function(req, res, options, i18next) { /* return true to ignore */ }
  removeLngFromUrl: true,
})); // expose req.t with fixed lng
// missing keys; make sure the body is parsed (i.e. with [body-parser](https://github.com/expressjs/body-parser#bodyparserjsonoptions))
app.post('/static/locales/add/:lng/:ns',
  missingKeyHandler(i18next)); // serves missing key route for consumers (browser)
// multiload backend route
app.get('/static/locales/resources.json',
  getResourcesHandler(i18next)); // serves resources for consumers (browser)

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  if (app.get('env') === 'development')
    console.log(req.body);

  //console.log(req.method === 'POST' && req.path === '')
  const message = err.message;
  const error = app.get('env') === 'development' ? err : {};

  // render the error page
  const status = err.status || 500;
  res.status(status);

  if (req.headers['content-type'] !== "application/json") {
    if (req.t !== undefined)
      res.render('error', {
        layout: 'layout',
        lang: req.language,
        title: `${req.t(`srv-error:${message}`)} | ${req.t(`srv-main:proName`)}`,
        description: `${req.t(`srv-error:${message}`)} | ${req.t(`srv-main:proName`)}`,
        message: req.t(`srv-error:${message}`),
        error: error,
      });
    else
      res.render('error', {
        layout: 'layout',
        lang: 'en',
        title: `${message}`,
        description: `${message}`,
        message: `${message}`,
        error: error,
      });
  } else {
    res.json({
      jsonrpc: "2.0",
      error: {
        code: status, //error.code,
        message: message,
        data: error,
      },
      id: req.body.id,
    });
    /*
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token...');
    }
    */
  }
  logger.error('Error:', status, '-', message, '-', error);
});

module.exports = app;
