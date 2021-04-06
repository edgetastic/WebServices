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

/* POST a new comment */
router.post('/', function(req, res, next) {
  sql.query('INSERT INTO comments SET ?', req.body, function(error, result) {
    if(error) {
      res.status(400).send({
        message: 'Comment could no be saved'
      });
    }

    res.json(result);
  });
});

/* UPDATE a comment */
router.put('/:commendId', function(req, res, next) {
  sql.query('UPDATE comments SET content = ? WHERE commentId = ?', [req.body.content, req.params.commentId], function(error, result) {
    if(error) {
      res.status(400).send({
        message: 'Comment could not be updated'
      });
    }

    res.json(result);
  });
});

/* DELETE a comment by Id */
router.delete('/:commentId', function(req, res, next) {
  sql.query('DELETE FROM comments WHERE commentId = ?', req.params.commentId, function(error, result) {
    if(error) {
      res.status(400).send({
        message: 'Comment could not be found'
      });

      res.json(result);
    }
  });
});

module.exports = router;
