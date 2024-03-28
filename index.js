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

const ipAddress = '192.168.2.159';
const port = 3003

// Start the server
app.listen( port, ipAddress, () => {
    console.log( `Server started on port ${ipAddress}:${port}` );
} );

// thermostatService()