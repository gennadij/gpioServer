#!/bin/bash

cd ~/smarthome/gpioServer/

sudo nohup node main.js > output.log &
