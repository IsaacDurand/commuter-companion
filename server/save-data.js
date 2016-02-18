// The code below is adapted from unit 12.
// I used "createdb commuter-companion" in the command line to create a database called commuter-companion

var Sequelize = require('sequelize');
var sequelize = new Sequelize('commuter-companion', 'isaacdurand', 'kamv2014', { // This seems insecure...
  host: 'localhost',
  dialect: 'postgres'
});

// When I imported TwitterController into dataController, dataController became undefined in TwitterController.
var dataController = {};

var User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Add additional conditions to validate these values or at the very least make sure they're not null.
  phone: Sequelize.BIGINT,
  train: Sequelize.INTEGER,
  email: Sequelize.STRING,
  name: Sequelize.STRING
  // Sequlize adds createdAt and updatedAt fields automatically.
});

// I ran this code once, creating the User table. Do I need to run it again?
// sequelize.sync().then(function() {
//   console.log("Finished Syncing!");
// });

// Add the user to my database
dataController.createUser = function(req, res, next) {
  var userData = {};
  var train = Number(req.body.train);

  userData.train = train;
  userData.phone = Number(req.body.phone);
  userData.email = req.body.email; // Security concerns here?
  userData.name = req.body.name; // Security concerns here?

  User.create(userData);

  next();
}

// For now, I'm only including weekday trains because the Twitter account is active only M-F.
dataController.northboundTrains = [101, 103, 305, 207, 309, 211, 313, 215, 217, 319, 221, 323, 225, 227, 329, 231, 233, 135, 237, 139, 143, 147, 151, 155, 257, 159, 261, 263, 365, 267, 269, 371, 273, 375, 277, 279, 381, 283, 385, 287, 289, 191, 193, 195, 197, 199];

dataController.southboundTrains = [102, 104, 206, 208, 210, 312, 314, 216, 218, 220, 322, 324, 226, 228, 230, 332, 134, 236, 138, 142, 146, 150, 152, 254, 156, 258, 360, 262, 264, 366, 268, 370, 272, 274, 376, 278, 380, 282, 284, 386, 288, 190, 192, 194, 196, 198];

dataController.validTrainNumbers = dataController.northboundTrains.concat(dataController.southboundTrains); // I console-logged this and confirmed that it's correct.

dataController.checkWhetherTweetMentionsTrains = function(tweet) {
  
  this.validTrainNumbers.forEach(function(trainNum) {
  
    if (tweet.text.indexOf(trainNum) > -1) {

      // If the tweet mentions a train, find the appropriate users to alert.
      dataController.findUsersToAlert(trainNum);
    }

  });
}

dataController.findUsersToAlert = function(trainNum) {

  // Find users who are subscribed to this train.
  // User.findAll({
  //   where: {
  //     train: trainNum
  //   }
  // })
  //   .then(function(users) {

  //     if (users.length) {

  //       var usersToAlert = '';

  //       users.forEach(function(user) {
  //         usersToAlert += `${user.name}, `;
  //       });

  //       usersToAlert = usersToAlert.slice(0, -2);

  //       console.log(`Users to alert about ${trainNum}:
  //         ${usersToAlert}`)

  //       // I should probably incorporate the tweet into this too...
  //     }

  //   }, function(reason) {
  //     console.log(`Error: ${reason}`);
  //   });

  // For now, make a list of these users and note that they need an alert?

  // Then maybe make a page where I can see this info?
}


module.exports = dataController;
