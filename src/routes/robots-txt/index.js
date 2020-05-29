const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  res.send(`# https://www.robotstxt.org/robotstxt.html
User-agent: *
`);
});

module.exports = router;
