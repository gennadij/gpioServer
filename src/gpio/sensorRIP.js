const Gpio = require('pigpio').Gpio;


var gpio18 = new Gpio(18, {
  mode: Gpio.INPUT,
  pullUpDown: Gpio.PUD_DOWN,
  alert: true
});
count = 0
var d = new Date();
gpio18.on('alert', (level, tick) => {
  if(level == 0) {
    console.log(count + " Sensor 0")
    count++
  }else {
    console.log(count + " Sensor 1")
    count++
  }

});