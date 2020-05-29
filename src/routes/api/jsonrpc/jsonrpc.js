/**
 * JSON-RPC 2.0
 * https://www.jsonrpc.org/specification
 * http://expressjs.com/ru/api.html#express.json
 * "application/json" "100kb"
**/
const express = require('express');
const router = express.Router();
const auth = require('../../auth');
const { jsonRpcBatchHandler } = require('../../../jsonrpc');
//const mongoose = require('mongoose');
//const passport = require('passport');
//const Users = mongoose.model('User');






router.post('/', auth.optional, async (req, res, next) => {
  const { body, jwt } = req;
  const resObj = await jsonRpcBatchHandler(body, jwt);
  return res.json(resObj);
});

module.exports = router;


