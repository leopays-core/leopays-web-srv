const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
  <url>
    <loc>https://www.example.com/</loc>
    <lastmod>2020-06-01</lastmod>
  </url>
</urlset>`);
});

module.exports = router;
