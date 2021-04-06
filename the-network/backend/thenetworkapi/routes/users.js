const { JSONCookie } = require('cookie-parser');
const express = require('express');
const router = express.Router();
const Joi = require('Joi');
const sql = require('../db');
const multer = require('multer');
const bcrypt = require('bcrypt');
const validator = require('express-joi-validation').createValidator({passError: true}); 

// New user validation
const createUserSchema = Joi.object({
  email: Joi.string().email().max(200).required(),
  firstName: Joi.string().max(200).required(),
  lastName: Joi.string().max(200).required(),
  dateOfBirth: Joi.date().required(),
  creationDate: Joi.date().optional(),
  password: Joi.string().required()
});

// multer option
const upload = multer({
  dest: __dirname + '/uploads'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  sql.query('SELECT * FROM users', function(error, results) {
    if(error) {
      res.status(404).send({message: 'Users not found'});
    }

    // Delete password from response for security purposes
    results.forEach(function(result) {
      delete result.password;
    });

    res.json(results);
  });
});

/* GET a user by userId */
router.get('/:userId', function(req, res, next) {
  sql.query('SELECT * FROM users WHERE userId = ?', req.params.userId, function(error, result) {
    if(error) {
      res.status(404).send({message: 'User not found'});
    }
    
    // Delete password from response for security purposes
    delete result[0].password;

    res.json(result);
  });
});

/* GET a user's posts */
router.get('/:userId/posts', function(req, res, next) {
  sql.query('SELECT * FROM posts WHERE userId = ?', req.params.userId, function(error, results) {
    if(error) {
      res.status(404).send({message: 'Posts not found'});
    }

    res.json(results);
  });
});

/* GET a user's comments */
router.get('/:userId/comments', function(req, res, next) {
  sql.query('SELECT * FROM comments WHERE userId = ?', req.params.userId, function(error, results) {
    if(error) {
      res.status(404).send({message: 'Comments not found'});
    }

    res.json(results);
  });
});

/* POST a new user */
router.post('/register', validator.body(createUserSchema), function(req, res, next) {
  const saltRounds = 10;
  const plainPassword = req.body.password;

  bcrypt.hash(plainPassword, saltRounds, function(error, hash) {
    req.body.password = hash;
  });

  sql.query('INSERT INTO users SET ?', req.body, function(error, result) {
    if(error) {
      if(error.code == 'ERR_DUP_ENTRY') {
        res.status(400).send({
          message: 'User already exists. Please register with a different email address'
        });
        return;
      }
      next(error);
    }
    res.json(result);
  });
});

/* Upload a picture */
router.post('/upload', upload.single('profilePicture'), function(req, res) {
  if(!req.file) {
    res.status(400).send({
      message: 'Error uploading image'
    });
  }

  sql.query('UPDATE users SET profilePicture = ? WHERE userId = ?', [__dirname + '/uploads/' + req.file.originalname, req.body.userId], function(error, result) {
    if(error) {
      res.status(400).send({
        message: 'Upload failed'
      });
    }

    res.json(result);
  });
});


module.exports = router;
