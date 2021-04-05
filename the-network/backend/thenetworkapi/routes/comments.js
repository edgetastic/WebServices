const express = require('express');
const router = express.Router();
const Joi = require('Joi');
const sql = require('../db');
const validator = require('express-joi-validation').createValidator({passError: true}); 

/* GET comments listing. */
router.get('/', function(req, res, next) {
  sql.query('SELECT * FROM comments', function(error, results) {
    if(error) {
      res.status(404).send({
        message: 'Comments not found'
      });
    }

    res.json(results);
  });
});

/* GET comment by commentId */
router.get('/:commentId', function(req, res, next) {
  sql.query('SELECT * FROM comments WHERE commentId = ?', function(error, result) {
    if(error) {
      res.status(404).send({
        message: 'Comments not found'
      });
    }

    res.json(results);
  });
});

module.exports = router;
