module.exports.initDevices = function(params) {
  const Gpio = params.pigpio;
  const fs = params.fs;
  const logger = params.logger;
  const pathToDirGpioState = params.pathToDirGpioState
  const fileExtensionForGioState = params.fileExtensionForGioState
  const pathToFileGpioDevices = params.pathToFileGpioDevices
  //Lese difenierte Devices
  const jsonDevices = JSON.parse(fs.readFileSync(pathToFileGpioDevices));
  //Erstalle Ordner gpioState falls nicht geschehen
  var dirGpioState = "./db/gpioState"
  if(!fs.existsSync(dirGpioState)) {
    fs.mkdirSync(dirGpioState)
  }
  // Erstelle fuer jeden Device einen GPIO Objekt
  jsonDevices.devices.forEach(function(device){
    device.actors.forEach(function(actor){
      if(device.control == "lighting"){
        createPigpioOutObjectForLighting(actor, device)
      }else if(device.control == "shutter"){
        createPigpioOutObjectForShutter(actor, device)
      }else{
        logger.info("Unbekannter Art des Aktors")
      }
    });
    device.sensors.forEach(function(sensor){
      createPigpioInObject(sensor, device)
    });
  });
  
  return jsonDevices.devices;
  
  function createPigpioOutObjectForLighting(actor, device){
    actor.gpioObject = new Gpio(actor.gpio, {mode: Gpio.OUTPUT})
    actor.gpioObject.digitalWrite(1)
    fs.writeFileSync(pathToDirGpioState + device.id + "_" + actor.id  + fileExtensionForGioState, "OFF")
  }

  function createPigpioOutObjectForShutter(actor, device){
    actor.gpioObject = new Gpio(actor.gpio, {mode: Gpio.OUTPUT})
    actor.gpioObject.digitalWrite(1);
    if(actor.description == "ROOT"){
      fs.writeFileSync(pathToDirGpioState + device.id + "_" + actor.id  + fileExtensionForGioState, "STOP")
    }else{
      fs.writeFileSync(pathToDirGpioState + device.id + "_" + actor.id  + fileExtensionForGioState, "UP")
    }
  }

  function createPigpioInObject(sensor, device) {
    sensor.gpioObject = new Gpio(sensor.gpio, {
      mode: Gpio.INPUT,
      pullUpDown: Gpio.PUD_DOWN,
      alert: true
    });
    if(device.control == "lighting"){
      listner(sensor, device, fs, logger);
    }
  }
  //TODO Auslagern in neue Datei
  function listner(sensor, device, fs, logger) {
    sensor.gpioObject.glitchFilter(10000);
    sensor.gpioObject.on('alert', (level, tick) => {
      // var level = 0
      if(device.actors.length == 1) {
        const fileName = pathToDirGpioState + device.id + "_" + device.actors[0].id + fileExtensionForGioState
        var status = fs.readFileSync(fileName);
        if (level == 0) {
          if(status == "ON") {
            device.actors[0].gpioObject.digitalWrite(1);
            fs.writeFileSync(fileName, "OFF");
          } else {
            device.actors[0].gpioObject.digitalWrite(0);
            fs.writeFileSync(fileName, "ON");
          }
        }
      }else {
        logger.error("Fehler beim Definieren der Anzahl der Aktoren beim lighting")
      }
    });
  }
}
