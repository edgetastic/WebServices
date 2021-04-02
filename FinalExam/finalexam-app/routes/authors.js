var express = require('express');
var router = express.Router();
const sql = require('../db');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const authorSchema = Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    writing_type: Joi.string().required()
});

/* GET all the authors and their respective books */
router.get('/', function (req, res, next) {
    sql.query(`SELECT *
        FROM authors`, function (error, results) {
        if (error) {
            res.status(404).send({ message: "Author not found" });
        }
        res.json(results);
    });
});

router.get('/:id', function (req, res, next) {
    sql.query('SELECT * FROM authors WHERE id = ?', req.params.id, function (error, result) {
        if (error) {
            res.status(404).send({ message: "Author not found" });
        }
        res.json(result);
    });
});

router.post('/', validator.body(authorSchema), function (req, res, next) {
    sql.query('INSERT INTO authors SET ?', req.body, function (error, result) {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(400).send({
                    message: "Author already exists"
                });
                return;
            }
            next(error);
        }
        res.json(result);
    });
});

router.put('/:author_id', validator.body(authorSchema), function (req, res, next) {
    const data = req.body;

    sql.query("UPDATE authors SET id = ?, email = ?, name = ?, writing_type = ? WHERE id = ?", [data.id, data.email, data.name, data.writing_type, req.params.author_id], function (error, result) {
        if (error) next(error);
        res.json(result);
    })
});

router.delete('/:author_id', function (req, res, next) {
    sql.query("DELETE FROM authors WHERE id = ?", req.params.author_id, function (error, result) {
        if (error) {
            res.status(400).send({
                message: "Author not found",
            });
        }
        res.json(result);
    });
});

module.exports = router;