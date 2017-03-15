
# "Serial Switch" Plugin

[Homebridge](https://github.com/nfarina/homebridge/blob/master/example-plugins/homebridge-samplePlatform/index.js) plugin that pretends to be a lightbulb to allow you to send arbitrary commands out a serial port, e.g., to an Arduino. Set up `config.json` with your messages and device; the messages will be mapped to intervals between 0 and 100. E.g., if you have two messages, the first will be sent by setting the brightness of this "bulb" to anything between 0 and 50, and the second by setting the brightness to 50-100.

This allows you to create more or less arbitrary HomeKit commands by defining scenes that set this brightness value. For example, I have an HDMI switch controlled by an Arduino, and two HomeKit scenes to switch between different inputs: "TV Mode" is brightness to 25%, "Nintendo Mode" is brightness to 75%.

Thanks to [StatefulDummySwitch](https://github.com/mend1/homebridge-statefuldummy) for the simple example plugin.

Example config.json:

 ```
   ...
    "accessories": [
        {
            "accessory": "SerialSwitch",
            "name": "Projector",
            "device": "/dev/cu.usbserial-DC008MZU",
            "messages": ["1", "2"]
        }
    ]
    ...

```
