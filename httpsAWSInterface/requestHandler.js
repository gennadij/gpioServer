module.exports.handleRequest = function(params) {
  if (params.event.directive.header.namespace === 'Alexa.Discovery' && params.event.directive.header.name === 'Discover') {
    return require('./discoveryHandler.js').handleDiscovery(params);
  }
  else if (params.event.directive.header.namespace === 'Alexa.PowerController') {
    if (params.event.directive.header.name === 'TurnOn' || params.event.directive.header.name === 'TurnOff') {
      return require('./powerControlHandler.js').handlePowerControl(params);
    }
  }
}
