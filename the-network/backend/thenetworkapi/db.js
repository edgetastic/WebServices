'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'thenetworkdb'
});

connection.connect(function(error) {
    if(error) {
        console.log('DB connection failed');
        throw error;
    } else {
        console.log('DB connection successful');
    }
});

module.exports = connection;