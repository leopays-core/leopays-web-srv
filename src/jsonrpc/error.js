// https://www.jsonrpc.org/specification


class JsonRpcError extends Error {
  // -32603	Internal error	Internal JSON-RPC error.
  constructor(opts = {
    code: 32603, message: 'Internal error', data: undefined,
  }) {
    super();
    this.code = opts.code;
    this.message = opts.message;
    this.data = opts.data;
  }
}

module.exports = JsonRpcError;
