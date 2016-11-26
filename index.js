"use strict";

var Service, Characteristic;

module.exports = function(homebridge) {
 
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  
  homebridge.registerAccessory("homebridge-statefuldummy", "StatefulDummySwitch", StatefulDummySwitch);
}

function StatefulDummySwitch(log, config) {
  this.log = log;
  this.name = config.name;
  
  this._service = new Service.Switch(this.name);
  this._service.getCharacteristic(Characteristic.On)
    .on('set', this._setOn.bind(this));
}

StatefulDummySwitch.prototype.getServices = function() {
  return [this._service];
}

StatefulDummySwitch.prototype._setOn = function(on, callback) {

  this.log("Setting switch to " + on);
  
  callback();
}
