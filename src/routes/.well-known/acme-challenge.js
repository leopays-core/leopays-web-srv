const express = require('express');
const router = express.Router();
const cfg = require('../../config');


router.get('/:key', (req, res, next) => {
  const re = new RegExp(`^${req.params.key}.\\w+`);
  const arr = cfg.get('acme-challenge');
  const str = arr.find((element, index, array) => re.test(element));
  if (str !== undefined)
    return res.send(str);
  return next();
});

module.exports = router;

/*
# Add Certbot PPA
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update

# Install Certbot
sudo apt-get install -y certbot

sudo certbot certonly --standalone  \
  -m admin@domain.name --agree-tos \
  -d domain.name

sudo certbot certonly --preferred-challenges dns --manual \
  -m admin@domain.name --agree-tos \
  -d domain.name


sudo certbot certonly --manual -d domain.name -d www.domain.name
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator manual, Installer None
Obtaining a new certificate
Performing the following challenges:
http-01 challenge for domain.name

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

http://domain.name/.well-known/acme-challenge/7gqsQSvU8jE29zyqP0xISJztw_vBjXzvz1D_oN_X99g

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/etc/letsencrypt/live/domain.name/README
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
sudo cp /etc/letsencrypt/live/domain.name/privkey.pem .
sudo cp /etc/letsencrypt/live/domain.name/cert.pem .
sudo cp /etc/letsencrypt/live/domain.name/chain.pem .
*/
