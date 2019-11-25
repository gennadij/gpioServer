module.exports.handleDiscovery = function(params) {
  
  const logger = params.logger 
  
  const paramsInitDescoveryEndpoints = {
    pathToFileGpioDevices : params.pathToFileGpioDevices,
    pathToFileDescoveryEndpoints : params.pathToFileDescoveryEndpoints,
    fs : params.fs
  }

  params.initDescoveryEndpoints.initDescoveryEndpoints(paramsInitDescoveryEndpoints)

  const json_discovery = JSON.parse(params.fs.readFileSync(params.pathToFileDescoveryEndpoints))
  
  var header = params.event.directive.header;
  
  header.name = "Discover.Response";

  var response = {event: {header: header, payload: json_discovery}};

  return response;
}
