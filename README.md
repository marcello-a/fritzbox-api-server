# Fritz!Box REST API
This is a REST API for controlling Fritz!Box devices using the FritzAPI package and Express framework. The API provides GET endpoints for various functions related to controlling switches and thermostats.

## Getting Started
1. Clone this repository or download the source code
2. Install dependencies by running `npm install`
3. Add a file with the name `.env` in the root folder and add the following fields `FRITZ_USER: "<your-username>"` and `FRITZ_PW: "<your-password>"`
4. Start the server with `npm start`

## Usage
The server will start running on port 3000. You can use tools like cURL or Postman to test the endpoints. Here are the available endpoints:

### Switches
Get list: GET `/switches/switchlist`
Get state: GET `/switches/switchstate/:id`
Set on: GET `/switches/setswitchon/:id`
Set off: GET `/switches/setswitchoff/:id`
Toggle: GET `/switches/setswitchtoggle/:id`
Get power: GET `/switches/getswitchpower/:id`
Get energy: GET `/switches/getswitchenergy/:id`
Get presence status: GET `/switches/getswitchpresence/:id`
Get name: GET `/switches/getswitchname/:id`

### Thermostats
Get list (polyfill): GET `/thermostat/thermostatlist`
Get the current temperature: GET `/thermostat/getTempCurrent/:id`
Set target temperature (supports 'ON'/'OFF' to enable/disable thermostat): GET `/thermostat/settargettemp/:id/:temp/`
Get target temperature: GET `/thermostat/gettargettemp/:id`
Get comfort temperature: GET `/thermostat/getcomforttemp/:id`
Get night temperature: GET `/thermostat/getnighttemp/:id`
Get battery charge (uses UI scraping, may be unstable): GET `/thermostat/getbatterycharge/:id`
Get window open (uses UI scraping, may be unstable): GET `/thermostat/getwindowopen/:id`

All endpoints return JSON data. For endpoints that require an id parameter, you can get the IDs by calling the appropriate list function.

# Contributing
Pull requests and bug reports are welcome! Please open an issue first to discuss changes or new features.

# License
This project is licensed under the MIT License.