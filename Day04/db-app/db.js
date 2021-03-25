'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3305',
    user: 'root',
    password: 'password',
    database: 'superherodb'
});

connection.connect(function (err) {
    if (err) {
        console.log("DB connection failed");
        throw err;
    } else {
        console.log("DB connection successful");
    }
});

module.exports = connection;