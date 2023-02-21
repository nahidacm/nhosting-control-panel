FROM ubuntu:latest

USER root
WORKDIR /home/app
EXPOSE 3000
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_16.x  | bash -
RUN apt-get -y install nodejs
RUN npm install --global yarn