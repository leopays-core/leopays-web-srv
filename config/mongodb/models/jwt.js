// https://medium.com/nuances-of-programming/%D1%83%D1%87%D0%B8%D0%BC%D1%81%D1%8F-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D1%82%D1%8C-%D1%81-%D0%B0%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D0%B5%D0%B9-%D0%B2-node-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D1%8F-passport-js-58c14b9fe823

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const cfg = require('../../cfg');


const JWTSchema = new Schema(
  {
    issuer: { type: String, required: true, default: cfg.get('jwt.issuer') },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    revoked: { type: Boolean, default: false },
    expires_in: { type: Date, required: true, default: undefined },
  }, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
}
);
JWTSchema.index({ 'expires_in': 1 }, { expireAfterSeconds: 0 });

JWTSchema.virtual('algorithm')
  .get(function (value, virtual, doc) {
    return cfg.get('jwt.algorithm');
  });
JWTSchema.virtual('expiresIn')
  .get(function (value, virtual, doc) {
    return parseInt(this.expires_in.getTime() / 1000, 10);
  })
  .set(function (value, virtual, doc) {
    this.expires_in = new Date(value * 1000);
  });
JWTSchema.virtual('notBefore')
  .get(function (value, virtual, doc) {
    return undefined; // date 
  })
//audience
JWTSchema.virtual('iat')
  .get(function (value, virtual, doc) {
    return parseInt(this.created_at.getTime() / 1000, 10);
  });
JWTSchema.virtual('jwtid')
  .get(function (value, virtual, doc) {
    return this._id.toString();
  });
JWTSchema.virtual('subject')
  .get(function (value, virtual, doc) {
    return this.user.toString();
  });
//noTimestamp
//header
//keyid
//mutatePayload

JWTSchema.methods.generateJWT = function () {
  let payload = {
    iat: this.iat,
  };

  let opts = {
    algorithm: this.algorithm,
    expiresIn: this.expiresIn,
    notBefore: this.notBefore,
    //audience: ['user'],
    issuer: this.issuer,
    jwtid: this.jwtid,
    //keyid: 'keyid', //?
    subject: this.subject,
  };
  return jwt.sign(payload, cfg.get('jwt.secret'), JSON.parse(JSON.stringify(opts)));
}

JWTSchema.pre('validate', function (next) {
  let today = new Date();
  if (this.created_at === undefined)
    this.created_at = today;
  else
    today = this.created_at;

  if (this.expires_in === undefined) {
    const expirationDate = new Date(today);
    this.expires_in = expirationDate.setDate(
      today.getDate() + cfg.get('jwt.expiresInDays')
    );
  }
  next();
});

JWTSchema.pre('save', function (next) {
  next();
});



const JWT = mongoose.model('JWT', JWTSchema);

module.exports = JWT;
module.exports.JWTSchema = JWTSchema;