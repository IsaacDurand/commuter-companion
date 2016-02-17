
// Code below is from database project
var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var request = require('request');

var createUser = require('./server/save-data');

var server = http.createServer(app);

// Import controllers
// var eventCtrl = require('./controllers/event-controller');

app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
app.get('/', function(req, res) {
	// console.log('hello');
	// res.send(fs.readFileSync(__dirname + '/client/index.html'));
	// res.send(__dirname + '/client/index.html');
	// res.redirect('save-data.js')
	// res.sendFile(__dirname + '/save-data.js'); // This works.
	res.sendFile(__dirname + '/client/index.html');
});
// app.get('/events', eventCtrl.index);
// app.get('/event/:id', eventCtrl.show);

app.get('/main.js', function(req, res) {
	res.sendFile(__dirname + '/client/main.js');
});

// I used unit 11 as a reference.
// I'm managing to save train numbers and 
app.post('/signup', function(req, res) {
	// console.log('req.body ', req.body); // Thanks to body-parser, this now gives me what I want.
	var userData = {};
	userData.train = Number(req.body.train);
	userData.phone = Number(req.body.phone);
	userData.email = req.body.email; // String - I should make sure it's safe. Maybe using regex?
	// Could also tweet at them if I don't have time to figure out phone/email.
	// This is finally working - yay!
	createUser(userData);
	res.sendFile(__dirname + '/client/thanks.html');
});

// Talk to Twitter
var consumerKey = 'sctUvvfMwxXTCcMziXV1cWxJl';
var consumerSecret = '7VEkjATcDahRCuouE8KKqF7xLOuL35Wj59DmgrNbglZopTUmgz';
// I did not URL encode the values above.
var unencodedBearerTokenCredentials = `${consumerKey}:${consumerSecret}`;
var encodedBearerTokenCredentials = new Buffer(unencodedBearerTokenCredentials).toString('base64');
var contentType ='Content-Type: application/x-www-form-urlencoded;charset=UTF-8';
var authorizationValue = 'Basic ' + encodedBearerTokenCredentials + contentType;
console.log(authorizationValue);

var options = {
	method: 'PUT',
  url: 'https://api.twitter.com/oauth2/token',
  headers: {
    'Authorization': authorizationValue
  },
  body: 'grant_type=client_credentials'
};

request(options,
	function (error, response, body) {
    if (error) {
      return console.error('error:', error);
    }
    console.log('success?');
    console.log(response.body);
    // console.log(response); // This is giving me that huge object I hate...
	}
);
// app.post('https://api.twitter.com/oauth2/token', function)
// The value calculated in step 1 must be exchanged for a bearer token by issuing a request to POST oauth2 / token:

// The request must be a HTTP POST request.
// The request must include an Authorization header with the value of Basic <base64 encoded value from step 1>.
// The request must include a Content-Type header with the value of application/x-www-form-urlencoded;charset=UTF-8.
// The body of the request must be grant_type=client_credentials.

// Listen
server.listen(3000, function() {
  console.log('listening at http://localhost:3000');
});

// For Twitter, I think I need to check both the word 277 and #NB277

// Where (if anywhere) is server required?
// module.exports = server;

// I'm having trouble getting watchify to run, so I'm rebuilding manually for now.
// I'm also having trouble getting nodemon to work...
// Ideally, I would move server.js to the server folder, but then I'm not sure how I'd write the res.sendFile.

// Callback URL: I tried http://localhost:3000/twitter, but it didn't work, so then I used nothing.