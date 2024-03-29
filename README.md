
# pum-04
 - [Program start](#starting-program)
 - [Data format](#data-format)
 - [Docker setup](#docker-setup)
 - [Linting with ESLint](#linting-and-formatting-with-eslint-and-prettier)
 - [Naming conventions](#naming-conventions)
 - [Testing TypeScript code](#testing-the-frontend)
 - [Testing C++ code](#testing-the-backend-with-doctest)
## Starting program

### Docker
Docker has a startup script which compiles the neccessary files and installs dependencies upon running. 

The program can run with the following command in project root.
```
 docker compose up
```
If C++ code is changed or another npm dependency is installed make sure build the image again. 
```
 docker compose up --build
```

### Running locally
To run the program locally the dependencies currently used are

- [npm 9.5.1](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [NodeJS 18.16.0](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Emscripten 3.1.37](https://emscripten.org/)

With the dependencies installed following commands can be run from project root

Install Node dependencies.
```sh
npm i
```
Go to C++ file directory.
```sh
cd src/cpp/
```
Make sure to build ALL .cpp files in this directory to WASM with
```sh
emcc -lembind -o "file name".js "file name".cpp -s EXPORT_ES6=1 -s MODULARIZE=1 -s NO_DISABLE_EXCEPTION_CATCHING -s ALLOW_MEMORY_GROWTH -O3
```
Go back to project root
```sh
cd ../../
```
Start app with
```sh
npm run dev
```
The program can now be accessed on `localhost:3000`

## Data format
Description of how the uploaded files should be formated. 
### Performance file
The performance file which containts all method calls and the time it has taken should have the format
```
    response_time_bucket{method="GetPatient",le="6000"} 0
    response_time_bucket{method="GetPatient",le="6500"} 0
    response_time_bucket{method="GetPatient",le="7000"} 441
```
`method="string"` defines the name of the metric. `le="integer"` defines the time span and the last integer is the amount of calls in that timespan. 

The filename of the performance file has to be same as the site_id field of of a Metrics file.


### Metrics file
The metrics file contains information of different hosts and their specs of the hosts from the performance file. The site_id should be the same as the respective performance file it is connected with.

The program displays an average of cpu and memory from all connected metrics.

A metrics file can contain many hosts and one example is as follows.
```
{
 "site_id": "8137t3_230413",
 "site_name": "acklah",
 "baseline_version": "25.1",
 "type": "openstack",
 "nodes": {
  "ad": {
   "os": "Vanadium",
   "cpu": 8,
   "memory": 16,
   "services": [
    "uvclient",
    "risapp"
   ]
  }
 }
}
```


## Docker setup
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

> WINDOWS USERS: Docker volumes are used for real time updating files in the container, these apparently have problems working with windows. So WSL is recommended for development in windows. Docker volumes are defined in the docker-compose.yaml file. It should work without WSL if you remove the volumes from docker-compose.yaml file but you might have to create a new container for every change to the code. **This is according to one of the tutorial vidoes.**

>Workaround: Changes to files come into the container, however the file is not saved inside the container so changes do not take effect. Workaround is to enter the container and manually save the file.
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

## Naming conventions
### Typescript
The project should folow the naming conventions defined in [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#naming-conventions) and [Airbnb React Style Guide](https://github.com/airbnb/javascript/tree/master/react#naming)

- PascalCase should be used for Classes, Interfaces and React function components
- camelCase should be used for functions, variables and fields
- Acronyms and initialisms should always be all uppercased, or all lowercased.
- You may optionally UPPERCASE_A_CONSTANT only if it (1) is exported, (2) is a const (it can not be reassigned), and (3) the programmer can trust it (and its nested properties) to never change.

- File names should use PascalCase or camelCase, but must mirror the name of the default export exactly if one exists.
### C++
The project should follow the naming conventions defined in [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html#Naming).
- Filenames should be all lowercase and can include underscores (_) or dashes (-).
- PascalCase should be used for Types and functions, accessors and mutators may be named with snake_case.
- snake_case should be used for variables, class data mebers should have a trailing underscore.
- Constant variables should be named with a leading "k".
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

## Generating code coverage for the backend
To simply check the percentage of code run in file_handler.cpp just run the following command in the ```backend_test/``` folder. It also runs automatically in Git after every push. A bash shell and GCC/G++ is needed for the script.
```bash
./gcov_run.sh -git
```
To generate a full report, including data about specific functions and lines, LCOV must be installed on the system. It should be available in most package managers for both Linux and Mac. Once it is installed, run the following command:
```bash
./gcov_run.sh
```
Afterwards, navigate to the ```backend_test/res/``` folder and open ```index.html``` in a browser to see the full report.

*Note*: This does not work with CMake hence whý the solution is hard coded. The scripts would need to be modified if new source files are added.
   
## Testing the frontend
The tests run in GitHub Actions on each push to the repo.
### Writing tests

#### Jest
Tests are written using the framework Jest.  
Information about the Jest syntax can be found [here](https://jestjs.io/docs/using-matchers).  
A testfile should be placed inside the [/src/tests/unit](/src/tests/unit) and [/src/tests/integration](/src/tests/integration) folders depending on the test level and have the name `<component-to-test>.test.tsx` or `<component-to-test>.test.ts`  
Asset files are mocked since the functionality does not depend on them. 

#### testing-library
Testing-library can help when writing tests for React components, but it is not needed for testing functions that can run outside a component. 
The library provides methods for getting elements from the DOM and perform simulated user events.  
Information about querying the dom can be found [here](https://testing-library.com/docs/queries/about).  
Information about user events can be found [here](https://testing-library.com/docs/user-event/intro#writing-tests-with-userevent).  

### Running
Dependencies needs to be installed, install with  
`npm i`  

To run tests which uses WebAssembly modules, these need to be built first with some flags only used when testing.  
If we want to test a component using `Calculator.cpp` we can build it with
```sh 
emcc -lembind -o Calculator.js Calculator.cpp -s EXPORT_ES6=1 -s MODULARIZE=1 -s ENVIRONMENT="web" -s USE_ES6_IMPORT_META=0 -s SINGLE_FILE
```  

A script to build the modules needed for testing for Unix/Linux users is available in [/scripts/build_wasm_for_tests.sh](/scripts/build_wasm_for_tests.sh)

Run all tests that contains the name "Component"  
`npm run test <Component>`  
or run all integration tests  
`npm run test integration`

Run all tests with  
`npm run test`

Watch files for changes and rerun tests related to changed files
`npm run test:watch`

Watch files for changes and rerun all tests when something changes
`npm run test:watchAll`

### Coverage
Code coverage is collected for all tests. After each testrun a short report will be printed in the terminal.  
To see a more detailed coverage report open the locally generated file [<project-root>/coverage/lcov-report/index.html](/coverage/lcov-report/index.html) in a browser.
