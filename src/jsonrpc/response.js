// https://www.jsonrpc.org/specification
const JsonRpcError = require('./error');


class JsonRpcResponse {
  constructor(opts = { result: undefined, error: undefined, id: undefined }) {
    this.jsonrpc = "2.0";
    this.result = opts.result;
    this.error = opts.error ? new JsonRpcError(opts.error) : undefined;
    this.id = opts.id || null;
  }
}

module.exports = JsonRpcResponse;
