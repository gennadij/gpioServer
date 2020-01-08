module.exports.awsInterface = function(params) {
  
  const awsServer = params.awsServer
  const bodyParser = params.bodyParser
  const port = params.port
  const logger = params.logger;
  const https = params.https;
  const requestHandler = params.requestHandler;
  const piGpioObjectsAndDevices = params.piGpioObjectsAndDevices;
  const fs = params.fs;
  const lightingControl = params.lightingControl
  const pathToDirGpioState = params.pathToDirGpioState
  const fileExtensionForGioState = params.fileExtensionForGioState
  const initDescoveryEndpoints = params.initDescoveryEndpoints
  const pathToFileDescoveryEndpoints = params.pathToFileDescoveryEndpoints
  const pathToFileGpioDevices = params.pathToFileGpioDevices

  awsServer.use(bodyParser.urlencoded({extended: true}));
  awsServer.use(bodyParser.json());

  var options = {
    key : fs.readFileSync('./httpsAWSInterface/encryption/privatekey.pem'),
    cert : fs.readFileSync( './httpsAWSInterface/encryption/certificate.pem')
  }
  logger.info(initDescoveryEndpoints)
  awsServer.use((req, res, next) => {
    if (req.path == "/gennadiHeimann") {
      const paramsRequestHandler = {
        event : req.body,
        piGpioObjectsAndDevices : piGpioObjectsAndDevices,
        fs : fs,
        logger : logger,
        lightingControl : lightingControl,
        pathToDirGpioState : pathToDirGpioState,
        fileExtensionForGioState : fileExtensionForGioState,
        initDescoveryEndpoints : initDescoveryEndpoints,
        pathToFileDescoveryEndpoints : pathToFileDescoveryEndpoints,
	pathToFileGpioDevices : pathToFileGpioDevices
      }
      res.json(
        requestHandler.handleRequest(paramsRequestHandler)
      );
    }
  });

  var server = https.createServer(options, awsServer).listen(port, function() {
    logger.info("Common Server started" );
    logger.info("Common Server listning at http://" + server.address().address + ":" + server.address().port + ".");
  });
}
