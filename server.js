// Code below is from database project
var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var request = require('request');
var server = http.createServer(app);

var dataController = require('./server/save-data');
var TwitterController = require('./server/talk-to-twitter');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

// DO I STILL WANT THIS?
// TwitterController.checkForUpdates(); // This function runs whenever I npm start.

// Set up routes
app.get('/', function(req, res) {
	res.render(__dirname + '/client/index');
});

// I used unit 11 as a reference.
app.post('/signup', dataController.createUser, TwitterController.searchTwitter, function(req, res) {
	res.render(__dirname + '/client/thanks', {tweets: req.body.tweets, train: req.body.train});
});

app.get('/master', TwitterController.checkForUpdates, dataController.findTrainsMentionedInTweets, dataController.findUsersToAlert, function(req, res) {
	res.type('json');
	res.send(JSON.stringify(req.body.trainUpdate));
	// res.render(__dirname + '/client/master', {trainUpdate: JSON.stringify(req.body.trainUpdate)});
});

// Listen
server.listen(3000, function() {
  console.log('listening at http://localhost:3000');
});


// Wish list
// Validate user inputs before saving them

// Old notes
// module.exports = server; // Where (if anywhere) is server required?
// For Twitter, I think I need to check both the word 277 and #NB277
// I'm having trouble getting watchify to run, so I'm rebuilding manually for now.
// I'm also having trouble getting nodemon to work...
// Ideally, I would move server.js to the server folder, but then I'm not sure how I'd write the res.sendFile.
// Callback URL: I tried http://localhost:3000/twitter, but it didn't work, so then I used nothing.
// Could also tweet at them if I don't have time to figure out phone/email.