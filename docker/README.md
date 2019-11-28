### Container Directory structure

```
/data - data-dir (path for production)
/node_modules (replaced for production )
/web-srv
  /data - data-dir (default path, for development)
  /src
    /bin
    /lib
    /public
    /routes
    /views
```

### Docker release (version, latest):

Tags: version, latest

#### Docker cleaning

```bash
docker stop --time 0 $(docker ps)
docker rm -f $(docker ps -a)
docker rmi -f $(docker images -a)
```

```bash
cd ./docker
sh ./run-build-image.sh
sh ./run-push-image.sh
```
