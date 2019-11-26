//included
//const http = require('http');
const https = require('https');
const fs = require('fs');
//installed
const express = require('express');
const winston = require('winston');
const pigpio = require('pigpio').Gpio;
const bodyParser = require('body-parser');
//own
const initDevices = require("./gpio/init.js");
const httpPostPutInterface = require("./httpPostPutInterface/server.js")
const lightingControl = require("./gpio/lightingControl.js")
const shutterControl = require("./gpio/shutterControl.js")
const awsInterface = require("./httpsAWSInterface/server.js")
const awsRequestHandler = require("./httpsAWSInterface/requestHandler.js")
const initDescoveryEndpoints = require("./httpsAWSInterface/initDescoveryEndpoints.js")
const globalVar = require("./global/globalVar.js")
const log = require('./logger/logger.js');

const logger = log.createLogger(winston);
//Init Log (Vor dem Start des Skriptes wird logfile geloescht)
log.initLogs(logger, fs);
//File path and extension
const pathToDirGpioState = "./db/gpioState/"
const fileExtensionForGioState = ".txt"
const pathToFileGpioDevices = "./db/gpioDevices/gpioDevices.json"
const pathToFileDescoveryEndpoints = "./db/alexaDevices/descovery.json"

//TODO gpioState in Json-File spereichern

//INIT GPIO 
const paramsInit = {
  pigpio : pigpio,
  logger : logger,
  fs : fs,
  pathToDirGpioState : pathToDirGpioState,
  fileExtensionForGioState : fileExtensionForGioState,
  pathToFileGpioDevices : pathToFileGpioDevices
}

const piGpioObjectsAndDevices = initDevices.initDevices(paramsInit)

//HTTP POST and PUT Interface

paramsHttpPostPutInterface = {
  express : express,
  logger : logger,
  bodyParser: bodyParser,
  piGpioObjectsAndDevices : piGpioObjectsAndDevices,
  lightingControl : lightingControl,
  shutterControl: shutterControl,
  fs : fs,
  port : 50004,
  pathToDirGpioState : pathToDirGpioState,
  fileExtensionForGioState : fileExtensionForGioState,
  globalVar : globalVar
}

httpPostPutInterface.httpPostPutInterface(paramsHttpPostPutInterface)

//AWS HTTPS-SERVER
const awsServer = express();

paramsAWSInterface = {
  logger : logger,
  https : https,
  requestHandler : awsRequestHandler,
  fs : fs,
  piGpioObjectsAndDevices : piGpioObjectsAndDevices,
  bodyParser : bodyParser,
  awsServer : awsServer,
  port : 50001,
  lightingControl : lightingControl,
  pathToDirGpioState : pathToDirGpioState,
  fileExtensionForGioState : fileExtensionForGioState,
  initDescoveryEndpoints : initDescoveryEndpoints,
  pathToFileDescoveryEndpoints : pathToFileDescoveryEndpoints,
  pathToFileGpioDevices : pathToFileGpioDevices
}

awsInterface.awsInterface(paramsAWSInterface)

