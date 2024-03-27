const express = require( 'express' );
const app = express();
const path = require( 'path' );

const cors = require( 'cors');

// Enable CORS for all routes
app.use(cors());

const allRoute = require( './routes/all.route' )
const switchesRoute = require( './routes/switches.route' )
const thermostatRoute = require( './routes/thermostat.route' )

app.use(express.static(path.join(__dirname, 'public')));

app.get( '/', ( req, res ) => {
    res.sendFile( path.join( __dirname, 'index.html' ) );
} );


app.use( '/all', allRoute );
app.use( '/switches', switchesRoute );
app.use( '/thermostat', thermostatRoute );

// Start the server
app.listen( 3000, '192.168.2.159', () => {
    console.log( 'Server started on port 192.168.2.159:3000' );
} );


// thermostatService()