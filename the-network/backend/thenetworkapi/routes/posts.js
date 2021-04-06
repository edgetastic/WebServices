const express = require('express');
const router = express.Router();
const Joi = require('Joi');
const sql = require('../db');
const validator = require('express-joi-validation').createValidator({passError: true}); 

/* GET posts listing. */
router.get('/', function(req, res, next) {
    sql.query('SELECT * FROM posts', function(error, results) {
        if(error) {
            res.status(404).send({
                message: 'Posts not found'
            });
        }
        res.json(results);
    });
});

/* GET post by postId */
router.get('/:postId', function(req, res, next) {
    sql.query('SELECT * FROM posts WHERE postId = ?', req.params.postId, function (error, result) {
        if(error) {
            res.status(404).send({
                message: 'Post not found'
            });
        }
        res.json(result);
    });
});

/* GET post's comments */
router.get('/:postId/comments', function(req, res, next) {
    sql.query('SELECT * FROM comments WHERE postId = ?', req.params.postId, function(error, results) {
        if(error) {
            res.status(404).send({
                message: 'Comments not found'
            });
        }
        res.json(results);
    });
});

/*  */

module.exports = router;
