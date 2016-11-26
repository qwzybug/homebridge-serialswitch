
# "Stateful Dummy Switches" Plugin

With this plugin you can create fake "stateful" switches that do nothing when turned on or off. Such switches can be useful as state variables or triggers in HomeKit. This plugin is a simple derivative of the stateless switch homebridge-dummy plugin.

Example config.json:

 ```
    "accessories": [
        {
          "accessory": "StatefulDummySwitch",
          "name": "My Switch 1"
        }   
    ]

```

