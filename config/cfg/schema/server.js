const isProduction = process.env.NODE_ENV === 'production';


// Define a schema
const schema = {
  // Server
  server: {
    secure_mode: {
      doc: "Server secure mode.",
      format: Boolean,
      default: isProduction ? true : false,
      env: "SERVER_SECURE_MODE",
      arg: "server-secure-mode",
    },
    host: {
      doc: "The IP address to bind.",
      format: "*",
      default: "::", // "::" or "0.0.0.0" or "localhost"
      env: "SERVER_HOST",
      arg: "server-host",
    },
    exclusive: {
      doc: "exclusive.",
      format: Boolean,
      default: false,
    },
    ipv6Only: {
      doc: "ipv6 Only.",
      format: Boolean,
      default: false,
    },
    // HTTP
    http: {
      port: {
        doc: "The HTTP port to bind.",
        format: "port",
        default: isProduction ? 80 : 3000, // prod:80, dev:3000
        env: "SERVER_HTTP_PORT",
        arg: "server-http-port",
      },
    },
    // HTTPS (TLS/SSL) 
    https: {
      port: {
        doc: "The HTTPS port to bind.",
        format: "port",
        default: isProduction ? 443 : 4443, // prod:443, dev:4443
        env: "SERVER_HTTPS_PORT",
        arg: "server-https-port",
      },
      // Certificate
      key: {
        doc: "TLS/SSL key file name",
        format: String,
        default: undefined, //"server-key.pem",
        env: "SERVER_HTTPS_KEY",
        arg: "server-https-key",
      },
      cert: {
        doc: "TLS/SSL sert file name",
        format: String,
        default: undefined, //"server-cert.pem",
        env: "SERVER_HTTPS_SERT",
        arg: "server-https-sert",
      },
      // PFX
      pfx: {
        doc: "PFX file name",
        format: String,
        default: undefined, //"server.pfx",
        env: "SERVER_HTTPS_PFX",
        arg: "server-https-pfx",
      },
      pfx_pass: {
        doc: "PFX passphrase",
        format: String,
        default: undefined, //"passphrase",
        env: "SERVER_HTTPS_PFX_PASS",
        arg: "server-https-pfx-pass",
      },
    },

    // redirect
    https_redirect: {
      doc: "redirect to https",
      format: Boolean,
      default: false,
      env: "SERVER_HTTPS_REDIRECT",
      arg: "server-https-redirect",
    },
    www_redirect: {
      doc: "without www redirect to with www",
      format: Boolean,
      default: false,
      env: "SERVER_WWW_REDIRECT",
      arg: "server-www-redirect",
    },
    without_www_redirect: {
      doc: "without www redirect",
      format: Boolean,
      default: false,
      env: "SERVER_WITHOUT_WWW_REDIRECT",
      arg: "server-without-www-redirect",
    },
  },
};

module.exports = schema;
