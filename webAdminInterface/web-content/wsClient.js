document.addEventListener('DOMContentLoaded', main, false);

function main(){
  $("#gpioInitialized").html("GPIO");
  $("#gpioInitialized").css('background-color', 'rgb(000, 150, 000)');
  $("#gpioDevices").append("<table id='tableGpioDevices'></table>");
  const httpPort = location.port;
  const wsPort = Number(httpPort) + 1;
  const httpHostname = location.hostname;
  var wsUrl = "ws://" + httpHostname + ":" + wsPort;
  ws =  new WebSocket(wsUrl);
  createWebsocket(ws);

}

function createWebsocket(ws) {
    ws.onopen = function() {
      var mes = JSON.stringify({action : "isGpioInitialized", device : "webClient"});
      ws.send(mes);
   }
   ws.onmessage = function (evt) {
      var received_msg = JSON.parse(evt.data);
      console.log("Received Message: " + evt.data);
      messageHandler(received_msg);
   }

   ws.onclose = function() {
     console.log("Connection is closed...");
     $("#smarthomeServerStatus").css('background-color', 'rgb(150, 000, 000)');
     $("#smarthomeServerStatus").html("Server disconnected")
   }
}
