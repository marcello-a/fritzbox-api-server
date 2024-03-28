const express = require( 'express' );
const app = express();
const path = require( 'path' );

const bodyParser = require('body-parser');

const cors = require( 'cors');

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

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
    console.log( `Fritz!Box Rest API started on port ${ipAddress}:${port}` );
} );

// thermostatService()