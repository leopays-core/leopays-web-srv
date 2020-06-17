# Docker Image


### Image Directory structure
```
/
├── data - data-dir (path for production)
├── node_modules (replaced for production )
└── srv
    ├── bin
    ├── data - data-dir (default path, for development)
    └── src
        ├── app
        ├── config
        ├── i18n
        ├── jsonrpc
        ├── lib
        ├── public
        ├── routes
        ├── server
        └── views
```


### Docker release (version, latest):
Tags: version, latest

#### Docker cleaning
```bash
docker stop --time 0 $(docker ps)
docker rm -f $(docker ps -a)
docker rmi -f $(docker images -a)
docker system prune -a
```

#### Building and pushing image
```bash
cd ./docker
sh ./image_build.sh
sh ./image_push.sh
```


```bash
cat <<EOF > .env
ACME_CHALLENGE=
EOF
```


```bash
cat <<EOF > config.json
{
  "env": "production",
  "data": {
    "dir": "/data"
  },
  "config": {
    "file": "config.json"
  },
  "links": {
    "url": "https://leopays.dev/"
  },
  "logger": {
    "level": "trace",
    "appenders": {
      "stdout": true,
      "stderr": false,
      "gelf": false,
      "file": true
    },
    "file": {
      "name": "debug.log",
      "pattern": ".yyyy-MM-dd-hh",
      "keep_file_ext": true,
      "encoding": "utf-8",
      "mode": 511,
      "flags": "a",
      "compress": false,
      "always_include_pattern": false,
      "days_to_keep": 1
    }
  },
  "server": {
    "secure_mode": true,
    "host": "::",
    "exclusive": false,
    "ipv6Only": false,
    "http": {
      "port": 80
    },
    "https": {
      "port": 443,
      "key": "privkey.pem",
      "cert": "cert.pem",
      "ca": "chain.pem"
    },
    "https_redirect": false,
    "www_redirect": false,
    "without_www_redirect": false
  }
}
EOF
```
