// Define a schema
const schema = {
  //passport
  passport: {
    // crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)
    password: {
      salt: {
        size: {
          doc: "passport password salt size",
          format: Number,
          default: 16, //16,
        },
      },
      hash: {
        iterations: {
          doc: "passport password hash iterations",
          format: Number,
          default: 1, //10000,
        },
        keylen: {
          doc: "passport password hash keylen",
          format: Number,
          default: 256,//512,
        },
        digest: {
          doc: "passport password hash digest",
          format: String,
          default: 'sha256', //'sha512',
        },
      },
    }
  },
};

module.exports = schema;
