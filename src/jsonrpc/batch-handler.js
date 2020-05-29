// https://www.jsonrpc.org/specification
const Promise = require('bluebird').config({ cancellation: true });
const JsonRpcResponse = require('./response');
const jsonRpcMethodHandler = require('./method-handler');



const JsonRpc = {};


/**
 * @param {JSON-RPC Request object|Array} reqObj -
 * @param {JWT object} jwt -
 * @return {JSON-RPC Response object|Array}
**/
const jsonRpcBatchHandler = (reqObj, jwt) => { //(value, index, arrayLength)
  return new Promise((resolve, reject) => {
    switch (typeof reqObj) {
      case 'object':
        if (Array.isArray(reqObj)) { // batch of JSON-RPC Request objects
          let errors = [];
          let results = [];
          return Promise.mapSeries(reqObj, (request) => jsonRpcBatchHandler(request, jwt))//rpcHandler
            .then((resObj) => { results = resObj; })
            .catch((resObj) => { errors = resObj; })
            .finally(() => { resolve([].concat(results, errors).filter(Boolean)); });
          // not batch of JSON-RPC Request objects
        } else if (typeof reqObj.method === 'string') { // Valid Request
          return jsonRpcMethodHandler(reqObj, jwt).then(resolve).catch(reject);
        } else if (
          reqObj.method === undefined
          || reqObj.method === null
          || typeof reqObj.method !== 'string'
        ) {
          // -32600	Invalid Request	The JSON sent is not a valid Request object.
          return reject(new JsonRpcResponse({
            error: { code: -32600, message: 'Invalid Request' }, id: reqObj.id,
          }));
        }
      default: // Not Object - Invalid JSON
        //-32700	Parse error	Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.
        return reject(new JsonRpcResponse({
          error: { code: -32700, message: 'Parse error' }, id: reqObj.id,
        }));
    } // end of 'switch (typeof reqObj)'
  })
    .then((resObj) => { // JSON-RPC Response object -> result or Array
      return resObj;
    })
    .catch((resObj) => { // JSON-RPC Response object
      return resObj;
    })
    .finally(() => {
      //console.log('jsonRpcHandler done');
    });
}


module.exports = jsonRpcBatchHandler;
