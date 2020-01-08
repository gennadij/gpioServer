#!/bin/bash

cd /home/pi/smarthome/gpioServer/

nohup node main.js > output.log &
