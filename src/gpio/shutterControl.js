module.exports.shutterControl = function (params) {
  
  const action = params.action
  const device = params.device
  //const fs = params.fs
  const logger =  params.logger
  var countdownShutter = params.countdownShutter
  var timeouts = params.timeouts
<<<<<<< HEAD


=======
  var delay = 25000
  //TODO Initialisuíere alle shutter in einem Array
>>>>>>> dalayForShutter
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
  /*
    Rolllade WC UP
    ClearTimeout
      suche id im timeouts 
        wenn id gefunden
          dann loesche bestehender timeout
        wenn id nicht gefunden
          dann nichts tun
    SetTimeOut
      suche id im timeouts
        wenn id gefunden
          dann setze neue timeout 
        wenn id nicht gefunden
          dann erstelle neu id und setze neue timeout
  */
  if (action == "UP"){
<<<<<<< HEAD
    logger.info("Device " + device.id + " action " + action)
    //clear time out for shutter
=======
    logger.info("Device with root delay " + device.id + " action " + action)
    logger.info("timeouts UP " + timeouts)
>>>>>>> dalayForShutter

    //var index = undefined
    //timeouts.forEch(function(timeout) {
    //  if(timeout.id == device.id){
    //    clearTimeout(timeout.timeout)
        //index = timeouts.findIndex(timeout)  
     //}
    //})
    //delete timeout mit id von timeouts 
    //timeouts.splice(index, 1)

    //clearTimeout(countdownShutter)
    
    //Schalte Root aus
    pigpioObjectRoot.digitalWrite(1)
    
    //Schalte UpDown auf UP
<<<<<<< HEAD
    setTimeout(function(){
      pigpioObjectUpDown.digitalWrite(1)
      //Scalte Root wider ein
      pigpioObjectRoot.digitalWrite(0)  
    }, 1000)
    
    //warte bis rolladen unten ist und Schalte Root aus
    //new
    /*timeouts.forEch(function(timeout) {
      if(timeout.id == device.id){
        timeout.timeout = setTimeout(function() {
          pigpioObjectRoot.digitalWrite(1)
        }, 25000)
      }else{
        var timeout = {
          id : device.id,
          timeout : setTimeout(function(){
            pigpioObjectRoot.digitalWrite(1)
          }, 25000)
        }
        timeouts.push(timeout)
      }
    })*/

    //countdownShutter = setTimeout(function(){
    //  pigpioObjectRoot.digitalWrite(1)
    //}, 25000)
  }else if(action == "DOWN"){
    logger.info("Device " + device.id + " action " + action)
    //clear time out for shutter
    //clearTimeout(countdownShutter)
=======
    pigpioObjectUpDown.digitalWrite(1)

    //Scalte Root wider ein
    pigpioObjectRoot.digitalWrite(0)

    //Schon exsestierenden timeout fuer ID löschen
    //Und setze eine neues timeout
    timeouts.forEach(timeout => {
      if(timeout.id == device.id){
        clearTimeout(timeout.timeout)
        timeout.timeout = setTimeout(function() {
          pigpioObjectRoot.digitalWrite(1)
        }, delay)
      }
    })

    //Wenn timeouts leer ist, erstelle erste timeout
    /*if(timeouts.length == 0){
      timeouts.push({
        id : device.id,
        timeout : setTimeout(() => {
          logger.info("TimeOut abgelaufen")
          logger.info("pigpioObjectRoot.digitalWrite(1)")
          //pigpioObjectRoot.digitalWrite(1)
        }, delay)
      })
    }*/
  }else if(action == "DOWN"){
    logger.info("Device with root delay " + device.id + " action " + action)
    logger.info("timeouts DOWN " + timeouts)
>>>>>>> dalayForShutter
    
    //Schalte Root aus
    pigpioObjectRoot.digitalWrite(1)
    
    setTimeout(function(){
      //Schalte UpDown auf DOWN
      pigpioObjectUpDown.digitalWrite(0)
      //Scalte Root wider ein
      pigpioObjectRoot.digitalWrite(0)
    }, 1000)
    
    //warte bis rolladen unten ist und Schalte Root aus
<<<<<<< HEAD
    //countdownShutter = setTimeout(function(){
    //  pigpioObjectRoot.digitalWrite(1)
    //}, 25000)
=======
    //Schon exsestierenden timeout fuer ID löschen
    //Und setze eine neues timeout
    timeouts.forEach(timeout => {
      if(timeout.id == device.id){
        clearTimeout(timeout.timeout)
        timeout.timeout = setTimeout(() => {
          pigpioObjectRoot.digitalWrite(1)
        }, delay)
      }
    })

    //Wenn timeouts leer ist, erstelle erste timeout
    /*if(timeouts.length == 0){
      timeouts.push({
        id : device.id,
        timeout : setTimeout(() => {
          logger.info("TimeOut abgelaufen")
          logger.info("pigpioObjectRoot.digitalWrite(1)")
          //pigpioObjectRoot.digitalWrite(1)
        }, delay)
      })
    }*/
>>>>>>> dalayForShutter
  }else /*action == "STOP"*/ {
    logger.info("Device " + device.id + " action " + action)
    //clear time out for shutter
    timeouts.forEach(timeout => {
      if(timeout.id == device.id){
        clearTimeout(timeout.timeout)
      }
    })
    //Schalte Root aus
    pigpioObjectRoot.digitalWrite(1)
  }
}
