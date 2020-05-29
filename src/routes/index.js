const express = require('express');
const router = express.Router();



router.use('/', require('./home'));
router.use('/index.html', require('./home'));

// https://auth0.com/docs
router.use('/.well-known', require('./.well-known'));

//router.use('/auth', require('./auth'));
router.use('/api', require('./api'));

// URL-адрес политики конфиденциальности 
// Ссылка на вашу политику конфиденциальности. Политика конфиденциальности необходима для всех приложений.
router.use('/legal', require('./legal'));

// URL-адрес службы поддержки 
// URL-адрес службы поддержки Вашего приложения. Он будет отображаться в App Store.
router.use('/support', require('./support'));

router.use('/contact', require('./contact'));
router.use('/contact-us', require('./contact'));
router.use('/sitemap', require('./sitemap'));
//router.use('/robots.txt', require('./robots-txt'));
//router.use('/sitemap.xml', require('./sitemap-xml'));

// Личный кабинет для всех ролей
router.use('/my', require('./my'));

module.exports = router;
