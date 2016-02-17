// The code below is adapted from unit 12.
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
function createUser(req, res, next) {
  var userData = {};
  var train = Number(req.body.train);

  userData.train = train;
  userData.phone = Number(req.body.phone);
  userData.email = req.body.email; // Security concerns here?
  userData.name = req.body.name; // Security concerns here?

  User.create(userData);

  next();
}

module.exports = createUser;
