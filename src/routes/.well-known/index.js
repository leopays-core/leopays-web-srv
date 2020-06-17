const express = require('express');
const router = express.Router();


router.use('/acme-challenge', require('./acme-challenge'));

module.exports = router;
