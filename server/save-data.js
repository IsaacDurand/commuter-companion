
// Code below is adapted from database project.
// (When) will I use npm start?
// I used "createdb commuter-companion" in the command line to create a database called commuter-companion
var Sequelize = require('sequelize');


var sequelize = new Sequelize('commuter-companion', 'isaacdurand', 'kamv2014', { // This seems insecure...
  host: 'localhost',
  dialect: 'postgres'
});

var User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Add additional conditions to validate these values or at the very least make sure they're not null.
  phone: Sequelize.INTEGER,
  train: Sequelize.INTEGER,
  email: Sequelize.STRING
  // createdAt: Sequelize.DATE,
  // updatedAt: Sequelize.DATE // .NOW didn't work, but ?sequelize added these fields automatically.
});


// I ran this code once, creating the User table. Do I need to run it again?
// sequelize.sync().then(function() {
//   console.log("Finished Syncing!");
// });

// I'll test my module.exports function here. It seems to work (aside from the phone number).
// var userData = {};
// userData.train = 3;
// userData.phone = 5;
// userData.email = 'example@example.com';
// User.create(userData);

module.exports = function(dataObj) {
  User.create(obj);
}

// I will eventually use this to add entries to the database. How will I get the data in here? I think it should be a JS object... I can make this the callback function for a post request, right? I can look at what I did for Slack... What will the request body look like?
// The function below is simply what we did with the calendar data in the database project.
// module.exports = function(data) {
//   Event.sync({force: true}).then(function() {
//     for (var day in data) {
//       data[day].forEach(function(event) {
//         Event.create({
//           id: event.id,
//           summary: event.summary,
//           htmlLink: event.htmlLink,
//           sequence: event.sequence,
//           createdAt: new Date(event.created),
//           updatedAt: new Date(event.updated),
//           start: new Date(event.start.dateTime),
//           end: new Date(event.end.dateTime)
//         });
//       });
//     }
//   });
// };
