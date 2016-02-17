
// Code below is from database project
var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var request = require('request');

var createUser = require('./server/save-data');
var searchTwitter = require('./server/talk-to-twitter');

var server = http.createServer(app);

// Import controllers
// var eventCtrl = require('./controllers/event-controller');

app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.get('/main.js', function(req, res) {
	res.sendFile(__dirname + '/client/main.js');
});

// I used unit 11 as a reference.
app.post('/signup', function(req, res) {

	// Add the user to my database
	var userData = {};
	var train = Number(req.body.train);

	userData.train = train;
	userData.phone = Number(req.body.phone);
	userData.email = req.body.email; // Security concerns here?	
	createUser(userData);

	// Console-log all tweets from Caltrain_News from the past day that mention the user's train.
	// I've confirmed that the code below works with inputs that are numbers as well as inputs that are strings.
	searchTwitter(train);

	// Send the user to the thanks page
	res.sendFile(__dirname + '/client/thanks.html');

});

// Listen
server.listen(3000, function() {
  console.log('listening at http://localhost:3000');
});

// For Twitter, I think I need to check both the word 277 and #NB277

// Where (if anywhere) is server required?
// module.exports = server;

// Wish list
// Validate user inputs before saving them

// Old notes
// For Twitter, I think I need to check both the word 277 and #NB277
// I'm having trouble getting watchify to run, so I'm rebuilding manually for now.
// I'm also having trouble getting nodemon to work...
// Ideally, I would move server.js to the server folder, but then I'm not sure how I'd write the res.sendFile.
// Callback URL: I tried http://localhost:3000/twitter, but it didn't work, so then I used nothing.
// Could also tweet at them if I don't have time to figure out phone/email.