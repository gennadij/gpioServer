module.exports.startWsServer = function(params){

	const logger = params.logger
  
	const wssServerSmarthomeServer = new params.webSocket.Server({ port: params.port })

	wssServerSmarthomeServer.on('connection', function connection(ws) {
		logger.info("Smarthome-Server connected with Smarthome-WebClient")

		ws.on('message', function incoming(message) {
      params.adminWsMessageHandler.messageHandler(message, ws, params)
		});

		ws.on('close', function close(ws){
			logger.info("Smarthome Server WebSocket is disconnected")
		});

		ws.on('error', function error() {
			logger.error("Smarthome Server has Error");
		});
	});
}
