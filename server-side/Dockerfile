#FROM node:lts
#
#WORKDIR /ymca/server-side
#
#COPY . ./
#
#RUN npm install
#
#EXPOSE 8081
#
#CMD ["npm","start"]

#CMD ["ping","wp.pl"]



FROM ubuntu:18.04

# envs
ENV LANG=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8

RUN apt-get update --yes

# node js
RUN apt-get install --yes curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential

# ffmpeg
RUN apt-get install --yes ffmpeg

# youtube-dl
RUN curl -sL https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
RUN chmod a+rx /usr/local/bin/youtube-dl

WORKDIR /ymca/server-side

COPY . ./

RUN npm install

EXPOSE  8081

CMD ["npm","start"]

