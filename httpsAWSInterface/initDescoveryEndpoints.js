module.exports.initDescoveryEndpoints = function(params) {

  const pathToFileGpioDevices = params.pathToFileGpioDevices
  const pathToFileDescoveryEndpoints = params.pathToFileDescoveryEndpoints
  const fs = params.fs

  const jsonDevices = JSON.parse(fs.readFileSync(pathToFileGpioDevices))
  
  var endpoints = {"endpoints" : []}
  const manufacturerName = "Musterfirma"
  var description = "Lichtsteurung"

  jsonDevices.devices.forEach(function(device){
    
    deviceAlexaLightTemplate = {
      "endpointId": device.id,
      "manufacturerName": manufacturerName,
      "friendlyName": device.name,
      "description": description,
      "displayCategories": ["LIGHT"],
      "cookie": {},
      "capabilities":
      [
          {
            "type": "AlexaInterface",
            "interface": "Alexa",
            "version": "3"
          },
          {
              "interface": "Alexa.PowerController",
              "version": "3",
              "type": "AlexaInterface",
              "properties": {
                  "supported": [{
                      "name": "powerState"
                  }],
                   "proactivelyReported": true,
                   "retrievable": true
              }
          }
      ]
    }
    if(device.control == "lighting") {
      endpoints.endpoints.push(deviceAlexaLightTemplate)
    }
  })

  fs.writeFileSync(pathToFileDescoveryEndpoints, JSON.stringify(endpoints))
}