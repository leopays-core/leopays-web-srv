// https://www.jsonrpc.org/specification
//const Promise = require('bluebird').config({ cancellation: true });
//const JsonRpcError = require('./error');
//const JsonRpcResponse = require('./response');
//const jsonRpcMethodHandler = require('./method-handler');
const jsonRpcBatchHandler = require('./batch-handler');


const JsonRpc = {};

module.exports = JsonRpc;
module.exports.jsonRpcBatchHandler = jsonRpcBatchHandler;
