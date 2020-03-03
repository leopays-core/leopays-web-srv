// https://auth0.com/docs/jwks
// https://auth0.com/docs/tokens/reference/jwt/jwks-properties
const express = require('express');
const router = express.Router();


router.get('/7gqsQSvU8jE29zyqP0xISJztw_vBjXzvz1D_oN_X99g', (req, res, next) => {
  res.send('7gqsQSvU8jE29zyqP0xISJztw_vBjXzvz1D_oN_X99g.pZ3vjRmDs3wFsuLlAKMfECnOxFhl4Hwg2TDAw_0oKBE');
  /*
sudo certbot certonly --manual -d testnet.milliard.money
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator manual, Installer None
Obtaining a new certificate
Performing the following challenges:
http-01 challenge for testnet.milliard.money

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
NOTE: The IP of this machine will be publicly logged as having requested this
certificate. If you're running certbot in manual mode on a machine that is not
your server, please ensure you're okay with that.

Are you OK with your IP being logged?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: y

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Create a file containing just this data:

7gqsQSvU8jE29zyqP0xISJztw_vBjXzvz1D_oN_X99g.pZ3vjRmDs3wFsuLlAKMfECnOxFhl4Hwg2TDAw_0oKBE

And make it available on your web server at this URL:

http://testnet.milliard.money/.well-known/acme-challenge/7gqsQSvU8jE29zyqP0xISJztw_vBjXzvz1D_oN_X99g

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/etc/letsencrypt/live/testnet.milliard.money/README
This directory contains your keys and certificates.

`privkey.pem`  : the private key for your certificate.
`fullchain.pem`: the certificate file used in most server software.
`chain.pem`    : used for OCSP stapling in Nginx >=1.3.7.
`cert.pem`     : will break many server configurations, and should not be used
                 without reading further documentation (see link below).

WARNING: DO NOT MOVE OR RENAME THESE FILES!
         Certbot expects these files to remain in this location in order
         to function properly!

We recommend not moving these files. For more information, see the Certbot
User Guide at https://certbot.eff.org/docs/using.html#where-are-my-certificates.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
sudo cp /etc/letsencrypt/live/testnet.milliard.money/fullchain.pem .
sudo cp /etc/letsencrypt/live/testnet.milliard.money/privkey.pem .
*/
});

module.exports = router;
