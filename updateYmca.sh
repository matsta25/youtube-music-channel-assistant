#!/bin/bash

# ssh -i ~/.ssh/example-name.pem ubuntu@18.130.164.71 'bash -s' < updateYmca.sh

cd youtube-music-channel-assistant
sudo docker-compose down
cd ..
rm -rf youtube-music-channel-assistant
git clone https://github.com/matsta25/youtube-music-channel-assistant.git
cd youtube-music-channel-assistant
cp ../.env .
sudo docker-compose -f docker-compose.prod.yml up --build -d

