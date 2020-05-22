// Define a schema
const schema = {
  "acme-challenge": {
    doc: "acme-challenge strings",
    format: Array,
    default: [],
    env: "ACME_CHALLENGE",
    arg: "acme-challenge",
  },
};

module.exports = schema;
