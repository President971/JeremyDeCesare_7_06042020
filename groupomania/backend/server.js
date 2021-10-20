// Imports
var express     = require('express');
var bodyParser  = require('body-parser');
var cors = require('cors')
var apiRouter   = require('./apiRouter').router;

// Instantiate server
var server = express();

// cors server
server.use(cors())

// Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Configure routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.json({msg: 'This is CORS-enabled for all origins!'})
    res.status(200).send('<h1>Bonjour sur mon super server</h1>');
});

server.use('/api/', apiRouter);

// Launch server
server.listen(8080, function() {
    console.log('CORS-enabled web server listening on port 8080')
    console.log('Server en écoute :)');
});