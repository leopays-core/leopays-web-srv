// https://www.jsonrpc.org/specification
const Promise = require('bluebird').config({ cancellation: true });
const JsonRpcResponse = require('./response');
const { pingName, pingHandler } = require('./method/ping');
const { authName, authHandler } = require('./method/auth');


/**
 * @param {JSON-RPC Request object} reqObj -
 * @param {JWT object} jwt -
 * @return {JSON-RPC Response object}
**/
const jsonRpcMethodHandler = (reqObj, jwt) => {
  return new Promise((resolve, reject) => {
    // A Notification is a Request object without an "id" member.
    switch (reqObj.method) {
      case pingName:
        return pingHandler(reqObj, jwt).then(resolve).catch(reject);
      case authName(reqObj.method):
        return authHandler(reqObj, jwt).then(resolve).catch(reject);
      case 'notification': // A Notification is a Request object without an "id" member.
        //-32602	Invalid params	Invalid method parameter(s).
        resolve();
      //'actions after resolve notification'
      default:
        //-32601	Method not found	The method does not exist / is not available.
        return reject(new JsonRpcResponse({
          error: { code: -32601, message: 'Method not found' }, id: reqObj.id,
        }));
    }
  });
}

module.exports = jsonRpcMethodHandler;
