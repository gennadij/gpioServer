module.exports.handlePowerControl = function(params) {
  const event = params.event
  const gpioDevices = params.piGpioObjectsAndDevices
  const fs = params.fs
  const logger = params.logger
  const lightingControl = params.lightingControl
  const pathToDirGpioState = params.pathToDirGpioState
  const fileExtensionForGioState = params.fileExtensionForGioState
  
  // get device ID passed in during discovery
  var requestMethod = event.directive.header.name;
  var responseHeader = event.directive.header;
  responseHeader.namespace = "Alexa";
  responseHeader.name = "Response";
  responseHeader.messageId = responseHeader.messageId + "-R";
  // get user token pass in request
  var requestToken = event.directive.endpoint.scope.token;
  var powerResult;
  if (requestMethod === "TurnOn") {
    powerResult = "ON";
  }
  else if (requestMethod === "TurnOff") {
    powerResult = "OFF";
  }
  
  var contextResult = {
    "properties": [{
      "namespace": "Alexa.PowerController",
      "name": "powerState",
      "value": powerResult,
      "timeOfSample": new Date().toISOString(), //retrieve from result.
      "uncertaintyInMilliseconds": 50
    }]
  };
  
  const endpointId = event.directive.endpoint.endpointId;
  
  
  
  gpioDevices.forEach(function(device){
    if(endpointId == device.id){
      const paramsLightControl = {
        action : requestMethod,
        device : device,
        fs : fs,
        logger : logger,
        pathToDirGpioState : pathToDirGpioState,
        fileExtensionForGioState : fileExtensionForGioState
      }
      lightingControl.lightingControl(paramsLightControl)
    }
  })
  
  const response = {
    event: {
        header: responseHeader,
        endpoint: {
            scope: {
                type: "BearerToken",
                token: requestToken
            },
            endpointId: endpointId
        },
        payload: {}
    },
    context: contextResult,
  };
  return response;
}
