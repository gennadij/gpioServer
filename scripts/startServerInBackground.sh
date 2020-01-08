#!/bin/bash

cd ~/smarthome/smarthomeServer/

sudo nohup node main.js -i prod > output.log &
