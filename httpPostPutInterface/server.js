module.exports.httpPostPutInterface = function (params) {
  const logger = params.logger;
  const express = params.express;
  const bodyParser = params.bodyParser;
  const fs = params.fs;
  const lightingControl = params.lightingControl;
  const shutterControl = params.shutterControl;
  const piGpioObjectsAndDevices = params.piGpioObjectsAndDevices;
  const port = params.port
  const pathToDirGpioState = params.pathToDirGpioState
  const fileExtensionForGioState = params.fileExtensionForGioState

  var globalVar = params.globalVar

  countdownShutter = globalVar.countdownShutter

  const server = express();
  
  server.use(bodyParser.text({type: "text/plain"}));

  piGpioObjectsAndDevices.forEach(function(device){
            
    const pathForPOSTAndGET = "/" + device.control + "/myhome/" + device.id;
    
    logger.info("Path for action : " + pathForPOSTAndGET ) 

    //Change State by Openhab-Switch
    server.post(pathForPOSTAndGET, (req,res) => {
      var jsonBody = JSON.parse(req.body)
      logger.info("Request body " + JSON.stringify(jsonBody))
      logger.info("Device " + device.id + " Control " + device.control + " Actor " + device.actors[0].id )
      // Messages for light TurnOn|TurnOff
      // Messages for shutter UP|STOP|DOWN
      if(device.control == "lighting"){
        var paramslightControl = {
          action : jsonBody.action,
          device : device,
          fs : fs,
          logger : logger,
          pathToDirGpioState : pathToDirGpioState,
          fileExtensionForGioState : fileExtensionForGioState
        }
        lightingControl.lightingControl(paramslightControl)
      }else if(device.control == "shutter"){
        var paramsShuterControl = {
          action : jsonBody.action,
          device : device,
          fs : fs,
          logger : logger,
          countdownShutter : countdownShutter
        }
        shutterControl.shutterControl(paramsShuterControl)
      }else {
        logger.info("Unbekannter control")
      }
      res.send("ok")
    });

    //Update by Openhab-Switch
    server.get(pathForPOSTAndGET, (req, res) => {
      if(device.control == "lighting"){
        const gpioStateFilePath = pathToDirGpioState + device.id + "_" + device.actors[0].id  + fileExtensionForGioState
        const state = fs.readFileSync(gpioStateFilePath);
        if(state == "ON"){
          res.json({state : "ON"});
        }else{
          res.json({state : "OFF"});
        }
      }
    });
  });

  var s = server.listen(port, function () {
    logger.info("Web Server started" );
    logger.info("Web Server listning at http://" + s.address().address + ":" + s.address().port);
  });
}
