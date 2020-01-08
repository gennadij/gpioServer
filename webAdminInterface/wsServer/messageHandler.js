module.exports.messageHandler = function(message, ws, params) {

  //const gpio = params.gpio;
  //const initDevices = params.initDevices;
  const logger = params.logger
  //const gpioController = params.gpioController;
  const fs = params.fs

  var jsonMessage = JSON.parse(message)

  switch (jsonMessage.id) {
    case 1 :
      logger.info("startGpioServer()")
      break
    case 2 :
      logger.info("initGpio")
      break
    case 3 :
      getGpioDevices() 
      break
    case 4 :
      updaateGpioDevices(jsonMessage.params)
      break
    default: 
      logger.info("Unbekannte JSON-RPC-ID")
  }

  function getGpioDevices() {
    logger.info("getGpioDevices()")
    
    const jsonDevices = JSON.parse(fs.readFileSync(params.pathToFileGpioDevices))

    ws.send(
      JSON.stringify(
        {
          jsonrpc : "2.0",
          result : jsonDevices,
          id : 4
        }
      )
    )
  }
  
  function updaateGpioDevices(gpioDevices) {
    logger.info("updaateGpioDevices")
    
    //Impl Code

    ws.send(
      JSON.stringify(
        {
          jsonrpc : "2.0",
          result : {/*updated Gpio Devices*/},
          id : 4
        }
      )
    )
  }
}
