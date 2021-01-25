'use strict';
const mysql = require('mysql');
const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'root',
  database        : 'user_db'
});



// pool.on('connection', function (connection) {
//   console.log('Connected to db');
// });

// pool.on('release', function (connection) {
//   console.log('Connection %d released', connection.threadId);
// });

pool.on('enqueue', () => console.log('Waiting for available connection slot'));

pool.on('error', error => console.error(error));


module.exports = pool;
