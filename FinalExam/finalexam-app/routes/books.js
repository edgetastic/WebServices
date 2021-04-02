var express = require('express');
var router = express.Router();
const sql = require('../db');
const Joi = require('joi');
const e = require('express');
const validator = require('express-joi-validation').createValidator({});

const bookSchema = Joi.object({
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    reviews: Joi.number().required(),
    description: Joi.string().required(),
    editor: Joi.string().required()
});

router.get('/', function (req, res, next) {

    sql.query('SELECT * FROM books', function (error, results) {
        if (error) {
            res.status(404).send({
                message: "No books found"
            });
        }
        res.json(results);
    });
});

router.get('/:author_id', function (req, res, next) {
    sql.query('SELECT * FROM books WHERE author_id = ?', req.params.author_id, function (error, result) {
        if (error) {
            res.status(404).send({
                message: "Book not found"
            });
        }
        res.json(result);
    });
});

router.post('/', validator.body(bookSchema), function (req, res, next) {
    sql.query('INSERT INTO books SET ?', req.body, function (error, result) {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(400).send({
                    message: "Book already exists"
                });
                return;
            }
            next(error);
        }
        res.json(result);
    });
});
module.exports = router;