FROM ubuntu:18.04 as build-stage

# envs
ENV LANG=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8
RUN echo "LC_ALL=en_US.UTF-8" >> /etc/environment
RUN echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
RUN echo "LANG=en_US.UTF-8" > /etc/locale.conf
#RUN locale-gen en_US.UTF-8

#update
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

WORKDIR /ymca/

COPY package*.json ./

CMD ["npm", "install"]

COPY . .

CMD ["npm", "run", "start"]

#vue
CMD ["npm", "run", "build"]
