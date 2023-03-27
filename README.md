
# docker-setup
This repository contains some examples of how docker is used and a start of the Docker configuration to be used by the project.


# Running
Install docker and clone the repo then start the container
```sh
docker compose up --build
```
React app can be accessed by entering localhost:3000 in your web browser or using the container IP found with docker inspect "CONTAINER ID"
> NOTE: Windows users might have to remove/comment the "volumes" in docker-compose.yaml file 

# Learning
Recommended videos for running a container, understanding Dockerfile and docker-compose.yaml

|Subject| Video|
|-------|------|
|Dockerfile|https://www.youtube.com/watch?v=QePBbG5MoKk|
|Docker compose|https://www.youtube.com/watch?v=TSySwrQcevM|

> WINDOWS USERS: Docker volumes are used for real time updating files in the container, these apparently have problems working with windows. So WSL is recommended for development in windows. Docker volumes are defined in the docker-compose.yaml file. It should work without WSL if you remove the volumes from docker-compose.yaml file but you might have to create a new container for every change to the code. **This is according to one of the tutorial vidoes, so not verified.**

>Workaround: Changes to files come into the container, however the file is not saved inside the container so changes do not take effect. Workaround is to enter the container and manually open the file with vi and enter :wq
## Useful commands


If one does not like using CLI there are docker extensions to vscode and also a docker GUI. 


Display all currently running containers and some information about them such as container ID
```sh
docker ps
```

Terminal command to enter a container using the "bash" shell in the linux alpine container
```sh
docker exec -it "CONTAINER ID" bash
```

Remove containers created with docker compose up
```sh
docker compose down 
```
Display container IP and config
```sh
docker inspect "CONTAINER ID"
```

If there are more than one service in the docker-compose.yaml file a specific container can be created with
```sh
docker compose run "SERVICE NAME" bash
```


# Troubleshooting
## Linux: Have to run sudo on every docker command

Create the docker group if it does not exist

```sh
sudo groupadd docker
```

Add your user to the docker group.

```sh
sudo usermod -aG docker $USER
```

Log in to the new docker group (to avoid having to log out / log in again; but if not enough, try to reboot):

```sh
newgrp docker
```

Check if docker can be run without root


```sh
docker run hello-world
```


Reboot if still got error

```sh
reboot
```

## Error while running docker compose file
If there is no error with the file itself a pc reboot sometimes works

## cannot acces website on localhost
try using the network for the docker container instead

```sh
docker inspect "CONTAINER ID"
```
find the IPAddress for the container and enter "ip:port" in the webbrowser 
