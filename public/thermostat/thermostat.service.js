// Load username password
const Thermostat = require( "./thermostat.class" );
require( 'dotenv' ).config();

const Fritz = require( 'fritzapi' ).Fritz;
const f = new Fritz( process.env.FRITZ_USER, process.env.FRITZ_PW, "http://fritz.box" );


const getThermostatList = async () => {
    try {
        const thermostatList = await f.getThermostatList();
        return thermostatList;
    } catch ( error ) {
        console.error( error );
        return [];
    }
};

const getThermostatInfo = async (id) => {
    try {
        const [
            currentTemp,
            targetTemp,
            name,
            comfortTemp,
            nightTemp,
            batteryCharge,
            windowOpen
        ] = await Promise.all([
            f.getTemperature(id),
            f.getTempTarget(id),
            f.getThermostatName(id),
            f.getTempComfort(id),
            f.getTempNight(id),
            f.getBatteryCharge(id),
            f.getWindowOpen(id)
        ]);

        const thermostat = new Thermostat( {
            id,
            name,
            currentTemp,
            comfortTemp,
            nightTemp,
            targetTemp,
            windowOpen,
            batteryCharge
        } );
        return thermostat;
    } catch ( error ) {
        console.error( `Error fetching information for Thermostat ID: ${id}`, error );
        return null;
    }
};

const getThermostatsInfo = async (dummy = false) => {
    if (dummy) {
        return getDummyData();
    }

    const thermostatIds = await getThermostatList(); // Capture the returned list
    const thermostats = [];

    if ( thermostatIds.length > 0 ) {
        console.log( 'Thermostats:', thermostatIds );
        for ( const id of thermostatIds ) {
            await getThermostatInfo( id ).then( (thermostat) => {
                thermostats.push( thermostat )
            } );
        }
        console.log( thermostats )
    } else {
        console.log( 'No thermostats found or an error occurred' );
    }
    return thermostats;
}


const thermostatService = async () => {
    console.log( 'Main started' );
    const thermostats = getThermostatsInfo(true)
    console.log(thermostats)
    console.log( 'Main ended' );
};

const getDummyData = () => {
    const arr = []
    arr.push( new Thermostat( {
        id: '139790237763',
        name: 'Heizung Yogazimmer',
        currentTemp: 20.5,
        comfortTemp: 21,
        nightTemp: 16,
        windowOpen: false,
        batteryCharge: '100'
    } ) );
    arr.push( new Thermostat( {
        id: '139790905073',
        name: 'Heizung Vorderes Zimmer',
        currentTemp: 21,
        comfortTemp: 21,
        nightTemp: 16,
        windowOpen: false,
        batteryCharge: '100'
    } ) );
    arr.push( new Thermostat( {
        id: '139790908295',
        name: 'Heizung Schlafzimmer',
        currentTemp: 20,
        comfortTemp: 21,
        nightTemp: 16,
        windowOpen: false,
        batteryCharge: '100'
    } ) );
    return arr;
}


module.exports = {
    thermostatService
}