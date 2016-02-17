
// Code below is from database project
var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');

var server = http.createServer(app);

// Import controllers
// var eventCtrl = require('./controllers/event-controller');

// Set up routes
app.get('/', function(req, res) {
	console.log('goodbye');
	// res.send(fs.readFileSync(__dirname + '/client/index.html'));
	// res.send(__dirname + '/client/index.html');
});
// app.get('/events', eventCtrl.index);
// app.get('/event/:id', eventCtrl.show);

// Listen
server.listen(3000, function() {
  console.log('listening at http://localhost:3000');
});

// Where (if anywhere) is server required?
// module.exports = server;

// I'm having trouble getting watchify to run, so I'm rebuilding manually for now.
// I'm also having trouble getting nodemon to work...