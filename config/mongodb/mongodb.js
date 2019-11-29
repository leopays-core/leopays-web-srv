const cfg = require('../cfg');
const mongoose = require('mongoose');
const models = require('./models');


//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

const connectDb = () => {
  return new Promise((resolve, reject, onCancel) => {

    const usr =
      (cfg.get('db.user') !== undefined
        && cfg.get('db.pass') !== undefined)
        ? `${cfg.get('db.user')}:${cfg.get('db.pass')}@`
        : '';
    const srv = `${cfg.get('db.host')}:${cfg.get('db.port')}`;
    const name = `${cfg.get('db.name')}`;
    const uri = `mongodb://${usr}${srv}/${name}`;

    const options = {
      user: cfg.get('db.user') !== undefined ? cfg.get('db.user') : undefined,
      pass: cfg.get('db.pass') !== undefined ? cfg.get('db.pass') : undefined,
      dbName: cfg.get('db.name'),
      useNewUrlParser: cfg.get('db.options.useNewUrlParser'),
      bufferCommands: cfg.get('db.options.bufferCommands'),
      autoIndex: cfg.get('db.options.autoIndex'),
      autoReconnect: cfg.get('db.options.autoReconnect'),
    };

    mongoose.connect(uri, options);/*
    .then(
      () => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. * / },
      (err) => { /** handle initial connection error * / }
    )
    .catch((error) => console.error(error));*/
    mongoose.set('debug', !isProduction);
    //require('./models');

    const db = mongoose.connection;

    db.on('error', (error) => {
      console.error(error);
      process.exit(1);
    });
    db.once('open', () => {
      // we're connected!
      console.log(`db.once('open'`);
    });
    db.on('connected', () => {
      console.info("Succesfully connected to MongoDB Database");
    });
    return resolve(db);
  });
};


module.exports = models;
module.exports.connectDb = connectDb;


/* Connection Events
'connecting': Emitted when Mongoose starts making its initial connection to the MongoDB server
'connected': Emitted when Mongoose successfully makes its initial connection to the MongoDB server
'open': Equivalent to connected
'disconnecting': Your app called Connection#close() to disconnect from MongoDB
'disconnected': Emitted when Mongoose lost connection to the MongoDB server. This event may be due to your code explicitly closing the connection, the database server crashing, or network connectivity issues.
'close': Emitted after Connection#close() successfully closes the connection. If you call conn.close(), you'll get both a 'disconnected' event and a 'close' event.
'reconnected': Emitted if Mongoose lost connectivity to MongoDB and successfully reconnected. Mongoose attempts to automatically reconnect when it loses connection to the database.
'error': Emitted if an error occurs on a connection, like a parseError due to malformed data or a payload larger than 16MB.
'fullsetup': Emitted when you're connecting to a replica set and Mongoose has successfully connected to the primary and at least one secondary.
'all': Emitted when you're connecting to a replica set and Mongoose has successfully connected to all servers specified in your connection string.
'reconnectFailed': Emitted when you're connected to a standalone server and Mongoose has run out of reconnectTries. The MongoDB driver will no longer attempt to reconnect after this event is emitted. This event will never be emitted if you're connected to a replica set.
*/
/* https://mongoosejs.com/docs/api/connection.html
db.deleteModel(name);
db.disconnect();
db.dropCollection()
db.dropDatabase()
*/
