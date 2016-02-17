var request = require('request');

// Here is the code I used to get my bearer token.
var consumerKey = 'sctUvvfMwxXTCcMziXV1cWxJl'; // I did not URL encode this.
var consumerSecret = '7VEkjATcDahRCuouE8KKqF7xLOuL35Wj59DmgrNbglZopTUmgz'; // I did not URL encode this.
var unencodedBearerTokenCredentials = `${consumerKey}:${consumerSecret}`;
var encodedBearerTokenCredentials = new Buffer(unencodedBearerTokenCredentials).toString('base64');
var contentType ='Content-Type: application/x-www-form-urlencoded;charset=UTF-8';
var authorizationValue = 'Basic ' + encodedBearerTokenCredentials + contentType;

var TwitterController = {};

// Need a large count - though probably not 100 - to get tweets from previous days.
var options = { method: 'GET',
  url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
  qs: { screen_name: 'Caltrain_News', trim_user: true, exclude_replies: true },
  headers: 
   { 'postman-token': '4573cc8a-3267-4750-3574-4f7b692a8ab7',
     'cache-control': 'no-cache',
     authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAB6qkQAAAAAANM11L5sdnNtIkt5vqO%2FlD%2FxOefU%3D66tgRy76Pyvkqdrr6EbFo1p73XW4gjd4PieXMevLozKsNuTHvj' } };

// This function returns tweets that (1) were created within the past 12 hours and (2) mention the inputted train.
TwitterController.searchTwitter = function(req, res, next) {

	request(options, function (error, response, body) {

	  if (error) throw new Error(error);

	  var tweetArray = JSON.parse(body);
	  var result = [];
	  var currentTime = Date.now(); // number of milliseconds since 1 January 1970

	  tweetArray.forEach(function(tweet) {

	  	var tweetTime = Date.parse(tweet.created_at); // number of milliseconds between 1 January 1970 and when the tweet was created
	  	var timeDiff = (currentTime - tweetTime) / (60 * 60 * 1000); // in hours
	  	
	  	// This query seems to be pulling only tweets from the current day; I'm not sure why.
	  	// I confirmed that indexOf will search both the main text of the tweet and any hashtags.
	  	// I'm filtering tweets here, but I can't get trim to work on tweet.text.
	  	if (timeDiff <= 24 && tweet.text.indexOf(req.body.train) !== -1) result.push(tweet);
  	});

	  req.body.tweets = result;
		next();
  });
  // console.log(`The value of result in app.post is ${result}`);
} 

// Will setInterval work here, or will it cause trouble?
// Check Twitter periodically for new tweets from @caltrain_news
TwitterController.checkForUpdates = function() {

	// Create an options object to use in my request. Beware of mutating the original options object.
	var optionsForCheck = { method: 'GET',
	  url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
	  qs: { screen_name: 'Caltrain_News', trim_user: true, exclude_replies: true },
	  headers: 
	   { 'postman-token': '4573cc8a-3267-4750-3574-4f7b692a8ab7',
	     'cache-control': 'no-cache',
	     authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAB6qkQAAAAAANM11L5sdnNtIkt5vqO%2FlD%2FxOefU%3D66tgRy76Pyvkqdrr6EbFo1p73XW4gjd4PieXMevLozKsNuTHvj' } };

	// Create a function that we'll call repeatedly to send post requests.
	function sendPostRequest() {

		request(optionsForCheck, function (error, response, body) {

			console.log('request is running');

		  if (error) throw new Error(error);

		  var tweetArray = JSON.parse(body);

		  tweetArray.forEach(function(tweet) {

		  	// For testing only: acknowledge the tweet.
		  	console.log(`processing a tweet: ${tweet.text}`);

		  	// See whether I need to alert anyone about this tweet.
		  	// WRITE THIS FUNCTION

		  	// Make sure since_id is still the greatest ID of all processed tweets.
		  	if (!optionsForCheck.qs.since_id) optionsForCheck.qs.since_id = tweet.id;
		  	if (tweet.id > optionsForCheck.qs.since_id) optionsForCheck.qs.since_id = tweet.id;
		  	
	  	});
		});
	}

	// When the app launches, pull recent tweets and set the value of since_id.
		// Using a since_id of 0 did not work.
	sendPostRequest();
		
	// Check periodically for new tweets.
	setInterval(function() {

		console.log('setInterval is running');
		sendPostRequest();

	}, 3000);

}

// From https://nodejs.org/api/timers.html#timers_setinterval_callback_delay_arg:
// setInterval(callback, delay[, arg][, ...])#
// To schedule the repeated execution of callback every delay milliseconds. Returns a intervalObject for possible use with clearInterval(). Optionally you can also pass arguments to the callback.

// To follow browser behavior, when using delays larger than 2147483647 milliseconds (approximately 25 days) or less than 1, Node.js will use 1 as the delay.


module.exports = TwitterController;

// Old notes
// Here's the issue I faced when querying https://api.twitter.com/1.1/search/tweets.json. I saw the tweets in Postman but not in the terminal: http://stackoverflow.com/questions/29062363/twitter-search-api-returns-no-tweets.
// I don't need "src = 'typd'". That would mean that I  actually typed the query into search myself.
