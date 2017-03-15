"use strict";

var Service, Characteristic;

var SerialPort = require('serialport');

module.exports = function(homebridge) {
 
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  
  homebridge.registerAccessory("homebridge-serialswitch", "SerialSwitch", SerialSwitch);
}

function SerialSwitch(log, config) {
  this.log = log;
  this.name = config.name;
  
  this._serial = new SerialPort(config.device, {
    baudRate: 9600
  });
  this._serial.on('open', this._ready.bind(this));
  
  this._messages = config.messages;
  
  this._service = new Service.Lightbulb(config.name);
  this._service.getCharacteristic(Characteristic.Brightness).on('set', this._turn.bind(this));
}

SerialSwitch.prototype.getServices = function() {
  return [this._service];
}

SerialSwitch.prototype._ready = function() {
  // have to wait for the port to "warm up"
  setTimeout(function(){
    this._ready = true;
    this.log("Serial port ready.");
  }.bind(this), 5000);
}

SerialSwitch.prototype._turn = function(amt, callback) {
  this.log("Switching...");
  
  var msgCount = this._messages.length;
  if (msgCount < 1) {
    return;
  }
  
  var msgNum = 0;
  var step = 101 / msgCount
  var msgNum = Math.round(amt / step - 0.5);
  
  var message = this._messages[msgNum];
  this.log("Got brightness " + amt + ", matches message " + msgNum + " for output " + message);
  
  this._serial.write(message, function(err) {
    if (err) {
      this.log('Serial write error: ', err.message);
    }
    this.log('Successfully wrote serial message.');
  }.bind(this));
  
  // TODO: send serial signal
  callback();
}
