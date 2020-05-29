//session //https://www.npmjs.com/package/express-session
const isProduction = process.env.NODE_ENV === 'production';
const store = require('./session-store');


// Define a schema
const schema = {
  session: {
    name: {
      doc: "session name",
      format: String,
      default: "sid",//"connect.sid",
    },
    secret: {
      doc: "session secret",
      format: String,
      default: isProduction ? undefined : "keyboard^cat",
    },
    resave: {
      doc: "session resave",
      format: Boolean,
      default: false,
    },
    saveUninitialized: {
      doc: "session saveUninitialized",
      format: Boolean,
      default: false,
    },
    store: store,
    cookie: {
      maxAge: {
        doc: "session cookie.maxAge (number in milliseconds)",
        format: Number,
        default: isProduction ? 365 * 60 * 60 * 1000 : 60 * 1000,
      },
      secure: {
        doc: "session cookie.secure",
        format: Boolean,
        default: isProduction ? true : false,
      },
    }
  }
};

module.exports = schema;
