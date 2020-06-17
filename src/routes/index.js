const express = require('express');
const router = express.Router();


router.use('/', require('./home'));
router.use('/index.html', require('./home'));
router.use('/.well-known', require('./.well-known'));

module.exports = router;
