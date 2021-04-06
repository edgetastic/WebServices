const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.use(function (error, req, res, next) {
    if(error && error.error && error.error.isJoi) {
        res.status(400).json({
            message: error.error.toString(),
            error: error.message
        });
    } else {
        throw error;
    }
});

app.use(function(error, req, res, next) {
    res.status(500).json({
        message: "Something went wrong",
        error: error.message
    });
    return;
});

module.exports = app;
