module.exports.startWebServer = function(params) {

  const smarthomeWebServer = params.express();
  smarthomeWebServer.use(params.express.static('./webAdminInterface/web-content'));

  var server = smarthomeWebServer.listen(params.port, function () {
    params.logger.info("Web Server for Admin started" );
  	params.logger.info("Web Server listning for Admin at http://" + server.address().address + ":" + server.address().port);
  });
}
