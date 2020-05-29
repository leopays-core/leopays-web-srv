const express = require('express');
const router = express.Router();

router.use('/my', require('./my'));

router.use('/jsonrpc', require('./jsonrpc'));

module.exports = router;
