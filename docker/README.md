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
