FROM emscripten/emsdk:3.1.32
WORKDIR /app

#config and files required to start the webstie, these files and not in the volume 
COPY ./package.json /app/
COPY ./index.html /app/
COPY ./vite.config.ts /app/
COPY ./tsconfig.json /app/
COPY ./tsconfig.node.json /app/
COPY ./public /app/

#install npm used to run the project
RUN npm install
#COPY . .

#install some nice to haves should be removed in production image
RUN apt update
RUN apt install python3 -y
RUN apt install vim -y
RUN apt install sudo -y 
RUN apt install git -y


# required for docker desktop port mapping
EXPOSE 3000

# Docker startup
RUN apt install bash -y 
# docker startup needs to be there before the volume is started
COPY ./src/docker_startup.sh /app/src/

RUN chmod u+x /app/src/docker_startup.sh

CMD ["bash", "/app/src/docker_startup.sh"]
