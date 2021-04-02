var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authorsRouter = require('./routes/authors');
var booksRouter = require('./routes/books');
const e = require('express');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/authors', authorsRouter);
app.use('/books', booksRouter);

app.use(function (err, req, resp, next) {
    if (err && err.error && err.error.isJoi) {
        resp.status(400).json({
            message: err.error.toString(),
            error: err.message
        });
    } else {
        throw err;
    }
});

app.use(function (err, req, resp, next) {
    resp.status(500).json({
        message: "Something went wrong",
        error: err.message
    });
    return;
});

module.exports = app;
