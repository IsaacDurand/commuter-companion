var request = require('request');

// Here is the code I used to get my bearer token.
var consumerKey = 'sctUvvfMwxXTCcMziXV1cWxJl'; // I did not URL encode this.
var consumerSecret = '7VEkjATcDahRCuouE8KKqF7xLOuL35Wj59DmgrNbglZopTUmgz'; // I did not URL encode this.
var unencodedBearerTokenCredentials = `${consumerKey}:${consumerSecret}`;
var encodedBearerTokenCredentials = new Buffer(unencodedBearerTokenCredentials).toString('base64');
var contentType ='Content-Type: application/x-www-form-urlencoded;charset=UTF-8';
var authorizationValue = 'Basic ' + encodedBearerTokenCredentials + contentType;

// Need a large count - though probably not 100 - to get tweets from previous days.
var options = { method: 'GET',
  url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
  qs: { screen_name: 'Caltrain_News', trim_user: true, exclude_replies: true },
  headers: 
   { 'postman-token': '4573cc8a-3267-4750-3574-4f7b692a8ab7',
     'cache-control': 'no-cache',
     authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAB6qkQAAAAAANM11L5sdnNtIkt5vqO%2FlD%2FxOefU%3D66tgRy76Pyvkqdrr6EbFo1p73XW4gjd4PieXMevLozKsNuTHvj' } };

// This function returns tweets that (1) were created within the past 12 hours and (2) mention the inputted train.
function searchTwitter(train) {

	console.log(`searchTwitter is running with an input of ${train}, which is a ${typeof train}`);

	request(options, function (error, response, body) {

		console.log(`request is running`);

	  if (error) throw new Error(error);

	  var tweetArray = JSON.parse(body);
	  var currentTime = Date.now(); // number of milliseconds since 1 January 1970

	  tweetArray.forEach(function(tweet) {

	  	var tweetTime = Date.parse(tweet.created_at); // number of milliseconds between 1 January 1970 and when the tweet was created
	  	var timeDiff = (currentTime - tweetTime) / (60 * 60 * 1000); // in hours
	  	
	  	// This query seems to be pulling only tweets from the current day; I'm not sure why.
	  	if (timeDiff <= 24 && tweet.text.indexOf(train) !== -1) {

	  		// I confirmed that indexOf will search both the main text of the tweet and any hashtags.
	  		// I'm filtering tweets here, but I can't get trim to work on tweet.text.
	  		console.log(`Tweet created at ${tweet.created_at} (${timeDiff} hours ago)
	  			${tweet.text}`);
	  	}

	  });

	});
} 

module.exports = searchTwitter;

// Old notes
// Here's the issue I faced when querying https://api.twitter.com/1.1/search/tweets.json. I saw the tweets in Postman but not in the terminal: http://stackoverflow.com/questions/29062363/twitter-search-api-returns-no-tweets.
// I don't need "src = 'typd'". That would mean that I  actually typed the query into search myself.
