const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SessionSchema = new Schema({
  //_id
  //expires
  session: { type: String, index: true, required: true, },
});

const Session = mongoose.model('session', SessionSchema);

module.exports = Session;
module.exports.SessionSchema = SessionSchema;
