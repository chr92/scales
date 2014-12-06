var ADC, num, sensor, _i;

ADC = require("./index");

sensor = new ADC(0x48, 0x01);

for (num = _i = 1; _i <= 4; num = ++_i) {
  console.log(sensor.readADCSingleEnded(0, 6144, 250));
  console.log(sensor.readADCSingleEnded(1, 6144, 250));
}