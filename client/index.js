// Start with vanilla JS and add jQuery if I'm so inspired?
// console.log("You've successfully linked your files.");
// var $ = require('jquery'); // I've installed browserify, so I'm not sure why I can't use require here.
var $ = require('jquery');

$(document).ready(function() {
    $('#signup').on('click', function(event) {
    	event.preventDefault();
    	// I console-logged and confirmed that these values are being saved.
    	// var train = $('#train').val();
    	// var phone = $('#phone').val();
    	// var email = $('#email').val();

    	var userData = {};
    	userData.train = $('#train').val();
    	userData.phone = $('#phone').val();
    	userData.email = $('#email').val();
    });
});
// document.getElementById('signup').addEventListener('click', function(event) {
// 	event.preventDefault();
// 	console.log('Button clicked!');
// 	console.log(`train selected: ${document.getElementById('train').val()}` // ick...
// });

// I installed mysql and pg-hstore to make browserify happy.