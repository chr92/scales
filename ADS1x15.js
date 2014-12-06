var Analog2Digital, time, wire,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

wire = require('i2c');

time = require('sleep');

Analog2Digital = (function() {
  Analog2Digital.prototype.__IC_ADS1015 = 0x00;

  Analog2Digital.prototype.__IC_ADS1115 = 0x01;

  Analog2Digital.prototype.__ADS1015_REG_POINTER_MASK = 0x03;

  Analog2Digital.prototype.__ADS1015_REG_POINTER_CONVERT = 0x00;

  Analog2Digital.prototype.__ADS1015_REG_POINTER_CONFIG = 0x01;

  Analog2Digital.prototype.__ADS1015_REG_POINTER_LOWTHRESH = 0x02;

  Analog2Digital.prototype.__ADS1015_REG_POINTER_HITHRESH = 0x03;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_OS_MASK = 0x8000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_OS_SINGLE = 0x8000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_OS_BUSY = 0x0000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_OS_NOTBUSY = 0x8000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_MUX_MASK = 0x7000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_MUX_DIFF_0_1 = 0x0000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_MUX_DIFF_0_3 = 0x1000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_MUX_DIFF_1_3 = 0x2000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_MUX_DIFF_2_3 = 0x3000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_MUX_SINGLE_0 = 0x4000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_MUX_SINGLE_1 = 0x5000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_MUX_SINGLE_2 = 0x6000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_MUX_SINGLE_3 = 0x7000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_PGA_MASK = 0x0E00;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_PGA_6_144V = 0x0000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_PGA_4_096V = 0x0200;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_PGA_2_048V = 0x0400;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_PGA_1_024V = 0x0600;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_PGA_0_512V = 0x0800;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_PGA_0_256V = 0x0A00;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_MODE_MASK = 0x0100;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_MODE_CONTIN = 0x0000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_MODE_SINGLE = 0x0100;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_DR_MASK = 0x00E0;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_DR_128SPS = 0x0000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_DR_250SPS = 0x0020;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_DR_490SPS = 0x0040;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_DR_920SPS = 0x0060;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_DR_1600SPS = 0x0080;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_DR_2400SPS = 0x00A0;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_DR_3300SPS = 0x00C0;

  Analog2Digital.prototype.__ADS1115_REG_CONFIG_DR_8SPS = 0x0000;

  Analog2Digital.prototype.__ADS1115_REG_CONFIG_DR_16SPS = 0x0020;

  Analog2Digital.prototype.__ADS1115_REG_CONFIG_DR_32SPS = 0x0040;

  Analog2Digital.prototype.__ADS1115_REG_CONFIG_DR_64SPS = 0x0060;

  Analog2Digital.prototype.__ADS1115_REG_CONFIG_DR_128SPS = 0x0080;

  Analog2Digital.prototype.__ADS1115_REG_CONFIG_DR_250SPS = 0x00A0;

  Analog2Digital.prototype.__ADS1115_REG_CONFIG_DR_475SPS = 0x00C0;

  Analog2Digital.prototype.__ADS1115_REG_CONFIG_DR_860SPS = 0x00E0;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_CMODE_MASK = 0x0010;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_CMODE_TRAD = 0x0000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_CMODE_WINDOW = 0x0010;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_CPOL_MASK = 0x0008;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_CPOL_ACTVLOW = 0x0000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_CPOL_ACTVHI = 0x0008;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_CLAT_MASK = 0x0004;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_CLAT_NONLAT = 0x0000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_CLAT_LATCH = 0x0004;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_CQUE_MASK = 0x0003;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_CQUE_1CONV = 0x0000;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_CQUE_2CONV = 0x0001;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_CQUE_4CONV = 0x0002;

  Analog2Digital.prototype.__ADS1015_REG_CONFIG_CQUE_NONE = 0x0003;

  function Analog2Digital(address, ic, debug) {
    this.address = address != null ? address : 0x48;
    this.ic = ic != null ? ic : this.__IC_ADS1015;
    this.debug = debug != null ? debug : false;
    this.spsADS1115 = {
      8: this.__ADS1115_REG_CONFIG_DR_8SPS,
      16: this.__ADS1115_REG_CONFIG_DR_16SPS,
      32: this.__ADS1115_REG_CONFIG_DR_32SPS,
      64: this.__ADS1115_REG_CONFIG_DR_64SPS,
      128: this.__ADS1115_REG_CONFIG_DR_128SPS,
      250: this.__ADS1115_REG_CONFIG_DR_250SPS,
      475: this.__ADS1115_REG_CONFIG_DR_475SPS,
      860: this.__ADS1115_REG_CONFIG_DR_860SPS
    };
    this.spsADS1015 = {
      128: this.__ADS1015_REG_CONFIG_DR_128SPS,
      250: this.__ADS1015_REG_CONFIG_DR_250SPS,
      490: this.__ADS1015_REG_CONFIG_DR_490SPS,
      920: this.__ADS1015_REG_CONFIG_DR_920SPS,
      1600: this.__ADS1015_REG_CONFIG_DR_1600SPS,
      2400: this.__ADS1015_REG_CONFIG_DR_2400SPS,
      3300: this.__ADS1015_REG_CONFIG_DR_3300SPS
    };
    this.pgaADS1x15 = {
      6144: this.__ADS1015_REG_CONFIG_PGA_6_144V,
      4096: this.__ADS1015_REG_CONFIG_PGA_4_096V,
      2048: this.__ADS1015_REG_CONFIG_PGA_2_048V,
      1024: this.__ADS1015_REG_CONFIG_PGA_1_024V,
      512: this.__ADS1015_REG_CONFIG_PGA_0_512V,
      256: this.__ADS1015_REG_CONFIG_PGA_0_256V
    };
    console.log('initialise i2c link');
    this.i2c = new wire(this.address, {
      device: '/dev/i2c-1',
      debug: false
    });
    if ((ic < this.__IC_ADS1015) | (ic > this.__IC_ADS1115)) {
      if (this.debug) {
        print("ADS1x15: Invalid IC specfied: %h" % ic);
        return -1;
      } else {
        this.ic = ic;
      }
      this.pga = 6144;
    }
  }

  Analog2Digital.prototype.readADCSingleEnded = function(channel, pga, sps) {
    var bytes, config, delay, done, returnValue;
    if (channel == null) {
      channel = 0;
    }
    if (pga == null) {
      pga = 6144;
    }
    if (sps == null) {
      sps = 250;
    }

    /*"Gets a single-ended ADC reading from the specified channel in mV. \
    The sample rate for this mode (single-shot) can be used to lower the noise \
    (low sps) or to lower the power consumption (high sps) by duty cycling, \
    see datasheet page 14 for more info. \
    The pga must be given in mV, see page 13 for the supported values."
     */
    returnValue = -100;
    if (channel > 3) {
      if (this.debug) {
        print("ADS1x15: Invalid channel specified: %d" % channel);
      }
      return -1;
    }
    config = this.__ADS1015_REG_CONFIG_CQUE_NONE | this.__ADS1015_REG_CONFIG_CLAT_NONLAT | this.__ADS1015_REG_CONFIG_CPOL_ACTVLOW | this.__ADS1015_REG_CONFIG_CMODE_TRAD | this.__ADS1015_REG_CONFIG_MODE_SINGLE;
    if (this.ic === this.__IC_ADS1015) {
      config |= this.setDefault(sps, this.spsADS1015, this.__ADS1015_REG_CONFIG_DR_1600SPS);
    } else {
      if ((__indexOf.call(this.spsADS1115, sps) < 0) & this.debug) {
        print("ADS1x15: Invalid pga specified: %d, using 6144mV" % sps);
      }
      config |= this.setDefault(sps, this.spsADS1115, this.__ADS1115_REG_CONFIG_DR_250SPS);
    }
    if ((__indexOf.call(this.pgaADS1x15, pga) < 0) & this.debug) {
      print("ADS1x15: Invalid pga specified: %d, using 6144mV" % sps);
    }
    config |= this.setDefault(pga, this.pgaADS1x15, this.__ADS1015_REG_CONFIG_PGA_6_144V);
    this.pga = pga;
    if (channel === 3) {
      config |= this.__ADS1015_REG_CONFIG_MUX_SINGLE_3;
    } else if (channel === 2) {
      config |= this.__ADS1015_REG_CONFIG_MUX_SINGLE_2;
    } else if (channel === 1) {
      config |= this.__ADS1015_REG_CONFIG_MUX_SINGLE_1;
    } else {
      config |= this.__ADS1015_REG_CONFIG_MUX_SINGLE_0;
    }
    config |= this.__ADS1015_REG_CONFIG_OS_SINGLE;
    bytes = [(config >> 8) & 0xFF, config & 0xFF];
    console.log('channel: ' + channel);
    this.i2c.writeBytes(this.__ADS1015_REG_POINTER_CONFIG, bytes, function(err) {
      if (err) {
        return console.log("error writing config to ADC");
      }
    });
    delay = Math.floor((1.0 / sps + 0.001) * 1000);
    time.usleep(delay * 1000);
    done = false;
    this.i2c.readBytes(this.__ADS1015_REG_POINTER_CONVERT, 2, function(err, result) {
      var val;
      if (this.ic === this.__IC_ADS1015) {
        returnValue = (((result[0] << 8) | (result[1] & 0xFF)) >> 4) * pga / 2048.0;
        done = true;
      } else {

      }
      val = (result[0] << 8) | result[1];
      if (val > 0x7FFF) {
        returnValue = (val - 0xFFFF) * pga / 32768.0;
        return done = true;
      } else {
        done = true;
        return returnValue = ((result[0] << 8) | result[1]) * pga / 32768.0;
      }
    });
    while (!done) {
      require('deasync').runLoopOnce();
    }
    return returnValue;
  };

  Analog2Digital.prototype.talk = function() {
    return console.log("My i2c address is " + this.address);
  };

  Analog2Digital.prototype.setDefault = function(key, dict, defVal) {
    if (key in dict) {
      return dict[key];
    } else {
      return defVal;
    }
  };

  return Analog2Digital;

})();

module.exports = Analog2Digital;
