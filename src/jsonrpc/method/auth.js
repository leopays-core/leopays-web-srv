// https://www.jsonrpc.org/specification
const Promise = require('bluebird').config({ cancellation: true });
const JsonRpcResponse = require('../response');


const name = (str) => (str.match(/^auth./) || {}).input;
const handler = (reqObj, jwt) => {
  return new Promise((resolve, reject) => {
    switch (reqObj.method) {
      case 'auth.jwt':
        //-32602	Invalid params	Invalid method parameter(s).
        return resolve(new JsonRpcResponse({
          result: { auth: new Date().getTime() }, id: reqObj.id,
        }));
      default:
        //-32601	Method not found	The method does not exist / is not available.
        return reject(new JsonRpcResponse({
          error: { code: -32601, message: 'Method not found' }, id: reqObj.id,
        }));
    }
  });
}
/*

switch (str) {
  case (str.match(/^xyz/) || {}).input:
    console.log("Matched a string that starts with 'xyz'");
    */

module.exports.authName = name;
module.exports.authHandler = handler;
