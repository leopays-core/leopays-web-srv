// https://medium.com/nuances-of-programming/%D1%83%D1%87%D0%B8%D0%BC%D1%81%D1%8F-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D1%82%D1%8C-%D1%81-%D0%B0%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D0%B5%D0%B9-%D0%B2-node-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D1%8F-passport-js-58c14b9fe823

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const cfg = require('../../cfg');


const UserSchema = new Schema(
  {
    email: {
      type: String, lowercase: true, trim: true,
      index: true, unique: true,
      required: true,
      validate: emailValidator(),
    },
    password: {
      salt: {
        size: { type: Number, required: true, default: cfg.get('passport.password.salt.size'), },
        value: { type: String, trim: true, required: true, },
      },
      hash: {
        iterations: { type: Number, required: true, default: cfg.get('passport.password.hash.iterations'), },
        keylen: { type: Number, required: true, default: cfg.get('passport.password.hash.keylen'), },
        digest: { type: Number, required: true, default: cfg.get('passport.password.hash.digest'), },
        value: { type: String, trim: true, required: true, },
      },
    },
    username: {
      type: String, trim: true,
      index: true, unique: true,
      default: undefined,
    },
    //first_name: { type: String, trim: true, default: undefined, },
    //middle_name: { type: String, trim: true, default: undefined, },
    //last_name: { type: String, trim: true, default: undefined, },
  }, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
}
);

UserSchema.methods.setPassword = function (password) {
  this.password.salt.value = crypto.randomBytes(this.password.salt.size).toString('hex');
  this.password.hash.value = crypto.pbkdf2Sync(
    password, this.password.salt.value,
    this.password.hash.iterations, this.password.hash.digest
  ).toString('hex');
};

UserSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(
    password, this.password.salt.value,
    this.password.hash.iterations, this.password.hash.digest
  ).toString('hex');
  return this.password.hash.value === hash;
};

UserSchema.methods.generateJWT = function () {
  let payload = {
    //exp: parseInt(expirationDate.getTime() / 1000, 10),
  };
  const newJWT = {
    user: this._id,
  }

  return this.model('JWT')(newJWT).save()
    .then((obj) => obj.generateJWT())
    .then((jwt) => jwt);
}

UserSchema.methods.toAuthJSON = function () {
  return this.generateJWT()
    .then((jwt) => {
      return {
        _id: this._id,
        email: this.email,
        token: jwt,
      };
    });
};


const User = mongoose.model('User', UserSchema);

module.exports = User;
module.exports.Userchema = UserSchema;


function emailValidator() {
  return {
    validator: (text) => {
      return text.includes('@');
    },
    message: "Email must have '@'.",
  };
}
