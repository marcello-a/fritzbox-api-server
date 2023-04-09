# Fritz!Box REST API
This is a REST API for controlling Fritz!Box devices using the FritzAPI package and Express framework. The API provides GET endpoints for various functions related to controlling switches and thermostats.

used Package from https://github.com/andig/fritzapi

## Getting Started
1. Clone this repository or download the source code
2. Install dependencies by running `npm install`
3. Add a file with the name `.env` in the root folder and add the following fields:
    - `FRITZ_USER: "<your-username>"`
    - `FRITZ_PW: "<your-password>"`
4. Start the server with `npm start`

## Usage
The server will start running on port 3000. You can use tools like cURL or Postman to test the endpoints. Here are the available endpoints:

## Switches

### Get switches 
```
GET /switches
```
Retrieves a list of all switches with name connected to the Fritz!Box.

### Get switch states 
```
GET /switches/:id
```
Retrieves the state, power usage, energy usage, and name of a specific switch.

### Get switch state
```
GET /switches/:id/state
```
Retrieves the state (on/off) of a specific switch.

### Get switch power
```
GET /switches/:id/power
```
Retrieves the current power usage of a specific switch.

### Get switch energy
```
GET /switches/:id/energy
```
Retrieves the total energy usage of a specific switch.

### Get switch presence
```
GET /switches/:id/presence
```
Retrieves the presence status of a specific switch.

### Get switch name
```
GET /switches/:id/name
```
Retrieves the name of a specific switch.

### Switch on
```
GET /switches/:id/switchOn
```
Turns on a specific switch.

### Switch off
```
GET /switches/:id/switchOff
```
Turns off a specific switch.

## Thermostats
### Get thermostat list
```
GET /thermostat
```
Retrieves the list of available thermostats. Returns a JSON array of objects containing the thermostat ID and name.

### Get current temperature
```
GET /thermostat/getCurrentTemp/:id
```
Retrieves the current temperature for the specified thermostat ID. Returns the temperature in Celsius as a number.

### Set target temperature
```
GET /thermostat/setTargetTemp/:id/:temp
```
Sets the target temperature for the specified thermostat ID. The temperature must be specified in Celsius as a number. Supports 'ON'/'OFF' to enable/disable thermostat.

### Get target temperature
```
GET /thermostat/getTargetTemp/:id
```
Retrieves the target temperature for the specified thermostat ID. Returns the temperature in Celsius as a number.

### Get comfort temperature
```
GET /thermostat/getComfortTemp/:id
```
Retrieves the comfort temperature for the specified thermostat ID. Returns the temperature in Celsius as a number.

### Get night temperature
```
GET /thermostat/getNightTemp/:id
```
Retrieves the night temperature for the specified thermostat ID. Returns the temperature in Celsius as a number.

### Get battery charge
```
GET /thermostat/getBatteryCharge/:id
```
Retrieves the battery charge for the specified thermostat ID. This endpoint uses UI scraping and may be unstable. Returns the battery charge as a percentage.

### Get window open
```
GET /thermostat/getWindowOpen/:id
```
Retrieves the window open status for the specified thermostat ID. This endpoint uses UI scraping and may be unstable. Returns true if the window is open, false otherwise.

All endpoints return JSON data. For endpoints that require an id parameter, you can get the IDs by calling the appropriate list function.

# Contributing
Pull requests and bug reports are welcome! Please open an issue first to discuss changes or new features.

# License
This project is licensed under the MIT License.