const isProduction = process.env.NODE_ENV === 'production';


// Define a schema
const schema = {
  // links
  links: {
    url: {
      doc: "links: external url",
      format: String,
      default: isProduction ? undefined : "http://localhost:3000"
    },
  }
};

module.exports = schema;
