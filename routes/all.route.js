const express = require( "express" );
const { parseXML } = require( "../util/xml.mapper" );
var router = express.Router();

// Load username password
require( 'dotenv' ).config();

var Fritz = require( 'fritzapi' ).Fritz;
var f = new Fritz( process.env.FRITZ_USER, process.env.FRITZ_PW, "http://fritz.box" );


router.get('/', async ( req, res ) => {
    try {
        console.log('Start test')
        const xmlString = await f.getDeviceListInfos();
        const obj = await parseXML(xmlString)
        res.json( obj );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( 'Error retrieving thermostat list' );
    }
} );

module.exports = router;
