# WEB SERVER

## Release creation

Stages:
- package.json (version);
- Git;
- GitHub release (version);
- Docker release (version, latest):
  - build;
  - push.

### Docker release (version, latest):

Tags: version, latest

```
cd docker
```

#### Docker cleaning

```bash
sh ./clean.sh
```

```bash
sh ./run-test.sh
sh ./run-build-image.sh
sh ./run-push-image.sh
```

## Server deployment

Stages:
- Tools;
- Directory;
- Docker:
  - Docker cleaning;
  - Docker launching.

### Tools

- Windows:
  - PuTTY - SSH client;
  - WinSCP - GUI SFTP (SSH File Transfer Protocol) client.
- macOS:
  - Terminal - SSH client;
  - Transmit - GUI SFTP (SSH File Transfer Protocol) client.
- docker;
- docker-compose.

### Directory structure

Make this directory structure:
```
~/mlrd-chain
  /web-srv
    /data
      config.json
    /docker
      /prod
        docker-compose.yml
      run-prod.sh
      stop-prod.sh
```

### Docker deployment

Stages:
- Docker cleaning;
- Docker launching.

#### Docker cleaning

```bash
docker stop --time 0 $(docker ps)
docker rm -f $(docker ps -a)
docker rmi -f $(docker images -a)
```

#### Docker launching

```bash
cd ~/mlrd-chain/web-srv/docker
docker pull mlrdchain/web-srv:latest
sh ./run-prod.sh
```

## certbot

Create a file containing just this data:

7gqsQSvU8jE29zyqP0xISJztw_vBjXzvz1D_oN_X99g.pZ3vjRmDs3wFsuLlAKMfECnOxFhl4Hwg2TDAw_0oKBE

And make it available on your web server at this URL:

http://testnet.milliard.money/.well-known/acme-challenge/7gqsQSvU8jE29zyqP0xISJztw_vBjXzvz1D_oN_X99g

