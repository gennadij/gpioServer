module.exports.shutterControl = function (params) {
  
  const action = params.action
  const device = params.device
  //const fs = params.fs
  const logger =  params.logger
  var countdownShutter = params.countdownShutter

  //var stateRoot = ""
  //var stateUpDown = ""
  var pigpioObjectRoot = ""
  var pigpioObjectUpDown = ""
   device.actors.forEach(function(actor){
    if(actor.description == "ROOT"){
      //stateRoot = fs.readFileSync("./db/" + device.id + "_" + device.actor.id + ".txt")
      pigpioObjectRoot = actor.gpioObject
    }else {
      //stateUpDown = fs.readFileSync("./db/" + device.id + "_" + device.actor.id + ".txt")
      pigpioObjectUpDown = actor.gpioObject
    }
  })
  // 
  if (action == "UP"){
    logger.info("Device " + device.id + " action " + action)
    //clear time out for shutter
    clearTimeout(countdownShutter)
    //Schalte Root aus
    pigpioObjectRoot.digitalWrite(1)
    //Schalte UpDown auf UP
    pigpioObjectUpDown.digitalWrite(1)
    //Scalte Root wider ein
    pigpioObjectRoot.digitalWrite(0)
    //warte bis rolladen unten ist und Schalte Root aus
    countdownShutter = setTimeout(function(){
      pigpioObjectRoot.digitalWrite(1)
    }, 20000)
  }else if(action == "DOWN"){
    logger.info("Device " + device.id + " action " + action)
    //clear time out for shutter
    clearTimeout(countdownShutter)
    //Schalte Root aus
    pigpioObjectRoot.digitalWrite(1)
    //Schalte UpDown auf DOWN
    pigpioObjectUpDown.digitalWrite(0)
    //Scalte Root wider ein
    pigpioObjectRoot.digitalWrite(0)
    //warte bis rolladen unten ist und Schalte Root aus
    countdownShutter = setTimeout(function(){
      pigpioObjectRoot.digitalWrite(1)
    }, 20000)
  }else /*action == "STOP"*/ {
    logger.info("Device " + device.id + " action " + action)
    //clear time out for shutter
    clearTimeout(countdownShutter)
    //Schalte Root aus
    pigpioObjectRoot.digitalWrite(1)
  }
}