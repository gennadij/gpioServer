#!/bin/bash

cd ~/smarthome/smarthomeServer/

sudo killall node

git pull bitbucket master

sudo nohup node main.js -i prod > output.log &
