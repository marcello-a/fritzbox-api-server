const express = require( "express" );
var router = express.Router();

// Load username password
require( 'dotenv' ).config();

var Fritz = require( 'fritzapi' ).Fritz;
var f = new Fritz( process.env.FRITZ_USER, process.env.FRITZ_PW, "http://fritz.box" );

// Route for getting the list of switches
router.get( '', async ( req, res ) => {
    try {
        const ains = await f.getSwitchList();
        const result = [];
        for ( let i = 0; i < ains.length; ++i ) {
            const name = await f.getSwitchName( ains[ i ] );
            result.push( { name: name, ains: ains[ i ] } );
        }
        const response = {
            switches: result
        };
        res.json( response );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( 'Error retrieving switch list' );
    }
} );

// Route for getting the state of a switch
router.get( '/:id', async ( req, res ) => {
    const switchId = req.params.id;
    const name = await f.getSwitchName( switchId );
    try {
        const name = await f.getSwitchName( switchId );
        const energy = await f.getSwitchEnergy( switchId );
        const state = await f.getSwitchState( switchId );
        const power = await f.getSwitchPower( switchId );
        const presence = await f.getSwitchPresence( switchId );
        const response = {
            sessionId: f.getSID(),
            switchId: switchId,
            name: name,
            state: state,
            power: power,
            energy: energy,
            presence: presence,
        };
        res.json( response );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( `Error retrieving all states of switch ${switchId}` );
    }
} );

// Route for getting the state of a switch
router.get( '/:id/state', async ( req, res ) => {
    const switchId = req.params.id;
    try {
        const state = await f.getSwitchState( switchId );
        const response = {
            switchId: switchId,
            state: state
        };
        res.json( response );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( `Error retrieving state of switch ${switchId}` );
    }
} );

// Route for getting the power of a switch
router.get( '/:id/power', async ( req, res ) => {
    const switchId = req.params.id;
    try {
        const power = await f.getSwitchPower( switchId );
        const response = {
            switchId: switchId,
            power: power
        };
        res.json( response );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( `Error retrieving power of switch ${switchId}` );
    }
} );

// Route for getting the total enery consumption. returns the value in Wh of a switch
router.get( '/:id/energy', async ( req, res ) => {
    const switchId = req.params.id;
    try {
        const energy = await f.getSwitchEnergy( switchId );
        const response = {
            switchId: switchId,
            energy: energy
        };
        res.json( response );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( `Error retrieving energy of switch ${switchId}` );
    }
} );

// Route for getting the presence status of a switch
router.get( '/:id/presence', async ( req, res ) => {
    const switchId = req.params.id;
    try {
        const presence = await f.getSwitchPresence( switchId );
        const response = {
            switchId: switchId,
            presence: presence
        };
        res.json( response );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( `Error retrieving presence status of switch ${switchId}` );
    }
} );

// Route for getting the name of a switch
router.get( '/:id/name', async ( req, res ) => {
    const switchId = req.params.id;
    try {
        const name = await f.getSwitchName( switchId );
        const response = {
            switchId: switchId,
            name: name
        };
        res.json( response );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( `Error retrieving name of switch ${switchId}` );
    }
} );

// Route for switch on
router.get( '/:id/switchOn', async ( req, res ) => {
    const switchId = req.params.id;
    try {
        const result = await f.setSwitchOn( switchId );
        const response = {
            switchId: switchId,
            state: result
        };
        res.json( response );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( `Error retrieving switchOn of switch ${switchId}` );
    }
} );

// Route for switch off
router.get( '/:id/switchOff', async ( req, res ) => {
    const switchId = req.params.id;
    try {
        const result = await f.setSwitchOff( switchId );
        const response = {
            switchId: switchId,
            state: result
        };
        res.json( response );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( `Error retrieving switchOff of switch ${switchId}` );
    }
} );

// Route for switch off
router.get( '/:id/toggleSwitch', async ( req, res ) => {
    const switchId = req.params.id;
    try {
        let result;
        await f.getSwitchState( switchId ).then( async function ( state ) {
            if ( state == false ) {
                result = await f.setSwitchOn( switchId );
            } else {
                result = await f.setSwitchOff( switchId );
            }
        } );
        const response = {
            switchId: switchId,
            state: result
        };
        res.json( response );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( `Error retrieving toggle of switch ${switchId}` );
    }
} );

module.exports = router;
