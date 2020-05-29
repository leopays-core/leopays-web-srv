// https://www.jsonrpc.org/specification
const Promise = require('bluebird').config({ cancellation: true });
const JsonRpcResponse = require('../response');


const name = 'ping';
const handler = (reqObj, jwt) => {
  return new Promise((resolve, reject) => {
    switch (reqObj.method) {
      case name:
        //-32602	Invalid params	Invalid method parameter(s).
        return resolve(new JsonRpcResponse({
          result: { pong: new Date().getTime() }, id: reqObj.id,
        }));
      default:
        //-32601	Method not found	The method does not exist / is not available.
        return reject(new JsonRpcResponse({
          error: { code: -32601, message: 'Method not found' }, id: reqObj.id,
        }));
    }
  });
}

module.exports.pingName = name;
module.exports.pingHandler = handler;
