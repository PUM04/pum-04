
# pum-04
## Linting and formatting with ESLint and Prettier
The ESLint rules are automatically checked in GitHub Actions on each push to the repo. The formatting is done with Prettier.
### Setting up and running
Install dependencies
`npm i`

Run ESLint to check for errors and warnings `npm run lint`

Some warnings and errors, for example, those related to formatting can be automatically fixed by running
`npm run lint:fix`
### Config
The linting rules are configured in the `.eslintrc.json` file. Most of the rules are from the Airbnb, Prettier, and JSdoc plugins.
### Integrating with an IDE or text editor
ESLint and Prettier are both available as plugins for the majority of the most common IDEs and text editors. The plugins help with highlighting linting errors and warnings, as well as formatting during development.

## docker-setup
### Running
Install docker and clone the repo then start the container
```sh
docker compose up --build
```
React app can be accessed by entering localhost:3000 in your web browser or using the container IP found with docker inspect "CONTAINER ID"
> NOTE: Windows users might have to remove/comment the "volumes" in docker-compose.yaml file 

### Learning
Recommended videos for running a container, understanding Dockerfile and docker-compose.yaml

|Subject| Video|
|-------|------|
|Dockerfile|https://www.youtube.com/watch?v=QePBbG5MoKk|
|Docker compose|https://www.youtube.com/watch?v=TSySwrQcevM|

> WINDOWS USERS: Docker volumes are used for real time updating files in the container, these apparently have problems working with windows. So WSL is recommended for development in windows. Docker volumes are defined in the docker-compose.yaml file. It should work without WSL if you remove the volumes from docker-compose.yaml file but you might have to create a new container for every change to the code. **This is according to one of the tutorial vidoes, so not verified.**

>Workaround: Changes to files come into the container, however the file is not saved inside the container so changes do not take effect. Workaround is to enter the container and manually open the file with vi and enter :wq
#### Useful commands


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


### Troubleshooting
#### Linux: Have to run sudo on every docker command

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

#### Error while running docker compose file
If there is no error with the file itself a pc reboot sometimes works

#### cannot acces website on localhost
try using the network for the docker container instead

```sh
docker inspect "CONTAINER ID"
```
find the IPAddress for the container and enter "ip:port" in the webbrowser 

## Testing the backend with Doctest
### Writing tests
Simply include ```#include "test_framework/doctest.h"``` in every file tests will be written in.
A simple tutorial for writing tests can be found [here.](https://github.com/doctest/doctest/blob/master/doc/markdown/tutorial.md)

### Build and run
Emcc and node needs to be installed on the system to be able to build and run the tests.

#### Run using the script (Linux)
Simply navigate to the backend_test folder and run
```bash
./test_run.sh
```
Note that the script might need to be set as a runnable with
```bash
chmod +x test_run.sh
```

#### Run manually
1. Navigate to the backend_test folder
2. ```emcmake cmake .```
3. ```emmake cmake --build .```
4. Rename test_runner.js to test_runner.cjs (I'm looking for ways to circumvent this)
5. ```node test_runner.cjs```
