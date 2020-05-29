/**
 * Middleware for request redirecting HTTP on HTTPS, without www on with www.
 *
 * @this  {https_www_redirect}
 * @param {object} options - Redirecting Options.
 * @param {object} options.https - HTTPS redirecting Options.
 * @param {boolean} options.https.redirect - Allow redirection.
 * @param {number} options.https.code - Redirection code.
 * @param {object} options.withoutWww - Without WWW redirecting Options.
 * @param {boolean} options.withoutWww.redirect - Allow redirection.
 * @param {number} options.withoutWww.code - Redirection code.
 * @return {function} - Middleware.
**/
function https_www_redirect(options) {
  const hsRedirect = options.https.redirect;
  const hsCode = options.https.code;
  const with3WRedirect = options.www.redirect;
  const with3WCode = options.www.code;

  if (!hsRedirect && with3WRedirect) {
    return wwwRedirect({
      redirect: with3WRedirect, code: with3WCode
    });
  } else if (hsRedirect && !with3WRedirect) {
    return httpsRedirect({
      redirect: hsRedirect, code: hsCode
    });
  } else if (hsRedirect && with3WRedirect) {
    return (req, res, next) => {
      if (req.protocol === "http" && !/^www./i.test(req.headers.host)) {
        res.writeHead(
          with3WCode,
          { "Location": "https://www." + req.headers.host + req.url }
        );
        res.end();
      } else if (req.protocol === "http") {
        res.writeHead(
          hsCode,
          { "Location": "https://" + req.headers.host + req.url }
        );
        res.end();
      } else if (!/^www./i.test(req.headers.host)) {
        res.writeHead(
          with3WCode,
          { "Location": "https://www." + req.headers.host + req.url }
        );
        res.end();
      } else {
        next();
      }
    }
  } else {
    return (req, res, next) => {
      next();
    }
  }
}
module.exports.https_www_redirect = https_www_redirect;


/**
 * Middleware for request redirecting HTTP on HTTPS, with www on without www.
 *
 * @this  {https_without_www_redirect}
 * @param {object} options - Redirecting Options.
 * @param {object} options.https - HTTPS redirecting Options.
 * @param {boolean} options.https.redirect - Allow redirection.
 * @param {number} options.https.code - Redirection code.
 * @param {object} options.withoutWww - Without WWW redirecting Options.
 * @param {boolean} options.withoutWww.redirect - Allow redirection.
 * @param {number} options.withoutWww.code - Redirection code.
 * @return {function} - Middleware.
**/
function https_without_www_redirect(options) {
  const hsRedirect = options.https.redirect;
  const hsCode = options.https.code;
  const without3WRedirect = options.withoutWww.redirect;
  const without3WCode = options.withoutWww.code;

  if (!hsRedirect && without3WRedirect) {
    return withoutWwwRedirect({
      redirect: without3WRedirect, code: without3WCode
    });
  } else if (hsRedirect && !without3WRedirect) {
    return httpsRedirect({
      redirect: hsRedirect, code: hsCode
    });
  } else if (hsRedirect && without3WRedirect) {
    return (req, res, next) => {
      if (req.protocol === "http" && /^www./i.test(req.headers.host)) {
        res.writeHead(
          without3WCode,
          { "Location": "https://" + req.headers.host.slice(4) + req.url }
        );
        res.end();
      } else if (req.protocol === "http") {
        res.writeHead(
          hsCode,
          { "Location": "https://" + req.headers.host + req.url }
        );
        res.end();
      } else if (/^www./i.test(req.headers.host)) {
        res.writeHead(
          without3WCode,
          { "Location": "https://" + req.headers.host.slice(4) + req.url }
        );
        res.end();
      } else {
        next();
      }
    }
  } else {
    return (req, res, next) => {
      next();
    }
  }
}
module.exports.https_without_www_redirect = https_without_www_redirect;


/**
 * Middleware for request redirecting without www on www.
 *
 * @this  {wwwRedirect}
 * @param {object} options - Redirecting Options.
 * @param {boolean} options.redirect - Allow redirection.
 * @param {number} options.code - Redirection code.
 * @return {function} - Middleware.
**/
function wwwRedirect(options) {
  const redirect = options.redirect;
  const code = options.code;

  if (redirect) {
    return (req, res, next) => {
      if (!/^www./i.test(req.headers.host)) {
        res.writeHead(
          code,
          { "Location": req.protocol + "://www." + req.headers.host + req.url }
        );
        res.end();
      } else {
        next();
      }
    }
  } else {
    return (req, res, next) => {
      next();
    }
  }
}
module.exports.wwwRedirect = wwwRedirect;


/**
 * Middleware for request redirecting with www on without www.
 *
 * @this  {withoutWwwRedirect}
 * @param {object} options - Redirecting Options.
 * @param {boolean} options.redirect - Allow redirection.
 * @param {number} options.code - Redirection code.
 * @return {function} - Middleware.
**/
function withoutWwwRedirect(options) {
  const redirect = options.redirect;
  const code = options.code;

  if (redirect) {
    return (req, res, next) => {
      if (/^www./i.test(req.headers.host)) {
        res.writeHead(
          code,
          {
            "Location": req.protocol + "://"
              + req.headers.host.slice(4)
              + req.url
          }
        );
        res.end();
      } else {
        next();
      }
    }
  } else {
    return (req, res, next) => {
      next();
    }
  }
}
module.exports.withoutWwwRedirect = withoutWwwRedirect;


/**
 * Middleware for request redirecting HTTP on HTTPS.
 *
 * @this  {httpsRedirect}
 * @param {object} options - Redirecting Options.
 * @param {boolean} options.redirect - Allow redirection.
 * @param {number} options.code - Redirection code.
 * @return {function} - Middleware.
**/
function httpsRedirect(options) {
  const redirect = options.redirect;
  const code = options.code;

  if (redirect) {
    return (req, res, next) => {
      if (req.protocol === "http") {
        res.writeHead(
          code, { "Location": "https://" + req.headers.host + req.url }
        );
        res.end();
      } else {
        next();
      }
    }
  } else {
    return (req, res, next) => {
      next();
    }
  }
}
module.exports.httpsRedirect = httpsRedirect;
