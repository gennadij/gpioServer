module.exports.lightingControl = function (params) {
  
  const action = params.action
  const device = params.device
  const fs = params.fs
  const logger =  params.logger
  const pathToDirGpioState =  params.pathToDirGpioState
  const fileExtensionForGpioState = params.fileExtensionForGioState

  const fileName = pathToDirGpioState + device.id + "_" + device.actors[0].id + fileExtensionForGpioState
  var state = fs.readFileSync(fileName)
  logger.info("Action from File : " + action + "  state : " + state);
  if(action == "TurnOn"){
    if(state == "OFF"){
      device.actors[0].gpioObject.digitalWrite(0);
      fs.writeFileSync(fileName, "ON");
    }
  }else{
    if(state == "ON"){
      device.actors[0].gpioObject.digitalWrite(1);
      fs.writeFileSync(fileName, "OFF");
    }
  }
}
