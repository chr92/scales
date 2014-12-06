var ADC, num, sensor, _i;

ADC = require("./ADS1x15");

sensor = new ADC(0x48, 0x00);

for (num = _i = 1; _i <= 4; num = ++_i) {
  console.log(sensor.readADCSingleEnded(0, 6144, 250));
}