// Code below is adapted from database project

// var pg = require('pg');

// var db = {};
// var uri = 'postgres://student:ilovetesting@localhost/postgresql-raw';
// The code above connects me to a database - but I don't I need to create the database first?

// pg.connect(uri, function(err, db_) {
//   if (err) throw new Error(err);
//   db.conn = db_;
// });

// db.index = function(queryObj, res) {
//   var queryString = `SELECT * FROM "events"`;
//   var conditions = [];
//   var parameters = [];
//   var i = 1;

//   for (var column in queryObj) {
//     parameters.push(queryObj[column]);

//     conditions.push(`"${column}" = $${i++}`);
//   }

//   if (conditions.length) {
//     queryString = queryString.concat(` WHERE `)
//                   .concat(conditions.join(' and '));
//   }

//   db.conn.query(queryString, parameters, function(err, result) {
//     if (err) {
//       res.sendStatus(404)
//     } else {
//       res.send(result.rows);
//     };
//   });
// };

// db.sequence;

// db.id;

// module.exports = db;
