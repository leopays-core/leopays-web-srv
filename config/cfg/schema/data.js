// Define a schema
const schema = {
  // Data dir
  data: {
    dir: {
      doc: "data.dir path",
      format: String,
      default: '../../data',
      env: "DATA_DIR",
      arg: "data-dir",
    }
  },
};

module.exports = schema;
