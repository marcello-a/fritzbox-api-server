const express = require( 'express' );
const app = express();

const switchesRoute = require( './routes/switches.route' )
app.use( '/switches', switchesRoute );

const thermostatRoute = require( './routes/thermostat.route' )
app.use( '/thermostat', thermostatRoute );

// Start the server
app.listen( 3000, () => {
    console.log( 'Server started on port 3000' );
} );
