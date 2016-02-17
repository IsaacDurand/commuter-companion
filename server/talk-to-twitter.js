// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
var request = require('request');

var consumerKey = 'sctUvvfMwxXTCcMziXV1cWxJl';
var consumerSecret = '7VEkjATcDahRCuouE8KKqF7xLOuL35Wj59DmgrNbglZopTUmgz';
// I did not URL encode the values above.
var unencodedBearerTokenCredentials = `${consumerKey}:${consumerSecret}`;
var encodedBearerTokenCredentials = new Buffer(unencodedBearerTokenCredentials).toString('base64');
var contentType ='Content-Type: application/x-www-form-urlencoded;charset=UTF-8';
var authorizationValue = 'Basic ' + encodedBearerTokenCredentials + contentType;
console.log(authorizationValue);

// Trying a different API
var options = { method: 'GET',
  url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
  qs: { screen_name: 'Caltrain_News', count: '20', trim_user: true, exclude_replies: true },
  headers: 
   { 'postman-token': '4573cc8a-3267-4750-3574-4f7b692a8ab7',
     'cache-control': 'no-cache',
     authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAB6qkQAAAAAANM11L5sdnNtIkt5vqO%2FlD%2FxOefU%3D66tgRy76Pyvkqdrr6EbFo1p73XW4gjd4PieXMevLozKsNuTHvj' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  var tweetArray = JSON.parse(body);
  tweetArray.forEach(function(tweet) {
  	console.log(`Tweet from ${tweet.created_at}: ${tweet.text}
  		`);
  });
});

// var options = {
// 	method: 'PUT',
//   url: 'https://api.twitter.com/oauth2/token',
//   headers: {
//     'Authorization': authorizationValue
//   },
//   body: 'grant_type=client_credentials'
// };

// I used Postman to generate a POST request and get my token. Honestly, though, I'm not sure how I did it...

// app.use(bodyParser.json());

// I don't need "src = 'typd'". That would mean that I  actually typed the query into search myself.
// var options = { method: 'GET',
//   url: 'https://api.twitter.com/1.1/search/tweets.json',
//   qs: { q: '277%20from%3ACaltrain_News' },
//   headers: 
//    { 'postman-token': 'e4ea4280-492c-2e6a-64e4-a1f498fe6c16',
//      'cache-control': 'no-cache',
//      authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAB6qkQAAAAAANM11L5sdnNtIkt5vqO%2FlD%2FxOefU%3D66tgRy76Pyvkqdrr6EbFo1p73XW4gjd4PieXMevLozKsNuTHvj' } };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);
//   var data = JSON.parse(body);
//   console.log(data);
//   // Do I need body-parser? Body is a string (as is response.body), but when I pass it through JSON.parse, I get an empty array for statuses.
//   // Here's the issue I'm facing: http://stackoverflow.com/questions/29062363/twitter-search-api-returns-no-tweets
// });

// request(options,
// 	function (error, response, body) {
//     if (error) {
//       return console.error('error:', error);
//     }
//     console.log('success?');
//     console.log(response.body);
//     // console.log(response); // This is giving me that huge object I hate...
// 	}
// );
// app.post('https://api.twitter.com/oauth2/token', function)
// The value calculated in step 1 must be exchanged for a bearer token by issuing a request to POST oauth2 / token:

// The request must be a HTTP POST request.
// The request must include an Authorization header with the value of Basic <base64 encoded value from step 1>.
// The request must include a Content-Type header with the value of application/x-www-form-urlencoded;charset=UTF-8.
// The body of the request must be grant_type=client_credentials.

