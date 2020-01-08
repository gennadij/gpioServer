function messageHandler(received_msg) {
  if (received_msg.device == "wsServer"){
    if(received_msg.action == "isGpioInitialized"){
      if (received_msg.data == "YES") {
        $("#gpioInitialized").css('background-color', 'rgb(000, 150, 000)');
        $("#gpioInitialized").html("GPIO is initialized");
      }else if (received_msg.data == "NO"){
        $("#gpioInitialized").css('background-color', 'rgb(150, 000, 000)');
        $("#gpioInitialized").html("GPIO is not initialized");
      }
    }else if(received_msg.action == "gpioDevices") {
      $("#gpioDevices").append("<label id='device1'>");
      $("#device1").html();
      $("#gpioDevices").append("<label id='description1'>");
      $("#description1").html();
      received_msg.data.forEach(function(device) {
        var name = device.name;
        var targetDevice = device.targetDevice;
        var smarthomeId = device.smarthomeId;
        var type = device.type;
        if(type == "IN") {
          var str = "<tr><th id='" + targetDevice + "'></th><th id='" + smarthomeId + "'></th></tr>"
          $("#tableGpioDevices").append(str);
          $("#" + targetDevice).html(name);
          $("#" + smarthomeId).append("<div id='div" + smarthomeId + "'></div>");
          $("#div" + smarthomeId).btnSwitch({
            OnCallback: function(val) {
              var mes = JSON.stringify({
                action : "switchStateChange",
                device : "webClient",
                data: {state : "TurnOn", smarthomeId: targetDevice}
              });
              ws.send(mes);
            },
            OffCallback: function(val) {
              var mes = JSON.stringify({
                action : "switchStateChange",
                device : "webClient",
                data: {state : "TurnOff", smarthomeId: targetDevice}
              });
              ws.send(mes);
            }
          });
        }
      });
    }
  }
}
