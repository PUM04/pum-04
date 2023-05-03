FROM node:18-bullseye-slim

RUN apt-get update
# Install nice to have tools
RUN apt-get install sudo -y
RUN apt-get install bash -y
# Install tools required for emsdk
RUN apt-get install git -y
RUN apt-get install cmake -y
RUN apt-get install python3 -y
RUN apt-get install xz-utils lbzip2 -y

# Install emsdk
RUN git clone https://github.com/emscripten-core/emsdk.git
WORKDIR /emsdk
RUN ./emsdk install latest
RUN ./emsdk activate latest
# Activate PATH and other environment variables in the current terminal
RUN bash emsdk_env.sh
RUN echo "source /emsdk/emsdk_env.sh" >>~/.bashrc

WORKDIR /app

# Config and files required to start the website
COPY ./package.json /app/
COPY ./jest.config.json /app/
COPY ./index.html /app/
COPY ./vite.config.ts /app/
COPY ./tsconfig.json /app/
COPY ./tsconfig.node.json /app/
COPY ./public /app/
COPY ./.eslintrc.json /app/
COPY ./.prettierrc /app/
COPY ./backend_test /app/backend_test/
COPY ./scripts /app/scripts/

# Install npm dependencies for the project
RUN npm install

# Required for docker desktop port mapping
EXPOSE 3000

RUN chmod u+x /app/scripts/docker_startup.sh

CMD ["bash", "/app/scripts/docker_startup.sh"]
