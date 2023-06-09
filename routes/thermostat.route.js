const express = require( "express" );
var router = express.Router();

// Load username password
require( 'dotenv' ).config();

var Fritz = require( 'fritzapi' ).Fritz;
var f = new Fritz( process.env.FRITZ_USER, process.env.FRITZ_PW, "http://fritz.box" );


// Get thermostat list (polyfill)
router.get( '/', async ( req, res ) => {
    try {
        const thermostatList = await f.getThermostatList();
        res.json( thermostatList );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( 'Error retrieving thermostat list' );
    }
} );

// Get current temperature
router.get( '/getCurrentTemp/:id', async ( req, res ) => {
    try {
        const { id } = req.params;
        const targetTemp = await f.getTemperature( id );
        res.json( targetTemp );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( 'Error retrieving current temperature' );
    }
} );

// Set target temperature (supports 'ON'/'OFF' to enable/disable thermostat)
router.get( '/setTargetTemp/:id/:temp', async ( req, res ) => {
    try {
        const { id, temp } = req.params;
        const result = await f.setTempTarget( id, temp );
        res.json( result );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( 'Error setting target temperature' );
    }
} );

// Get target temperature
router.get( '/getTargetTemp/:id', async ( req, res ) => {
    try {
        const { id } = req.params;
        const targetTemp = await f.getTempTarget( id );
        res.json( targetTemp );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( 'Error retrieving target temperature' );
    }
} );

// Get comfort temperature
router.get( '/getComfortTemp/:id', async ( req, res ) => {
    try {
        const { id } = req.params;
        const comfortTemp = await f.getTempComfort( id );
        res.json( comfortTemp );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( 'Error retrieving comfort temperature' );
    }
} );

// Get night temperature
router.get( '/getNightTemp/:id', async ( req, res ) => {
    try {
        const { id } = req.params;
        const nightTemp = await f.getTempNight( id );
        res.json( nightTemp );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( 'Error retrieving night temperature' );
    }
} );

// Get battery charge (uses UI scraping, may be unstable)
router.get( '/getBatteryCharge/:id', async ( req, res ) => {
    try {
        const { id } = req.params;
        const batteryCharge = await f.getBatteryCharge( id );
        res.json( batteryCharge );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( 'Error retrieving battery charge' );
    }
} );

// Get window open (uses UI scraping, may be unstable)
router.get( '/getWindowOpen/:id', async ( req, res ) => {
    try {
        const { id } = req.params;
        const windowOpen = await f.getWindowOpen( id );
        res.json( windowOpen );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( 'Error retrieving window open status' );
    }
} );

module.exports = router;