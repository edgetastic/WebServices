const express = require('express');
const router = express.Router();

let users = [
  {name: "superman", age: 79},
  {name: "catwoman", age: 33},
  {name: "batman", age: 40}
]

/* GET all users */
router.get('/', function(req, res, next) {
  res.json({users: users});
});

/* POST a new user */
router.post('/', function(req, res) {
  users.push(req.body);
  res.json({users: users});
});

/* PUT a user */
router.put('/', function(req, res) {
  users = req.body.users;
  res.json({users: users});
});

/* DELETE all users */
router.delete('/', function(req, res) {
  users = [];
  res.json({users: users});
});

/* DELETE one user */
router.delete('/:heroName', function(req, res) {
  const foundIndex = users.findIndex(user => user.name === req.params.heroName);

  if(foundIndex >= 0) {
    users.splice(foundIndex, 1);
    res.json({users: users});
  } else {
    res.json({users: users});
  }
});

// In-class assignment

// Write an api to fetch one specific user by name - get api
router.get('/:heroName', function(req, res, next) {
  const foundIndex = users.findIndex(user => user.name === req.params.heroName);

  if(foundIndex >= 0) {
    res.json({users: users[foundIndex]});
  } else {
    res.json({resp: "User not found"});
  }
});

// Write an api to edit one specific user by name - put api
router.put('/:heroName', function(req, res) {
  const foundIndex = users.findIndex(user => user.name === req.params.heroName);

  if(foundIndex < 0) {
    res.json({resp: "User not found"});
  } else {
    users[foundIndex] = req.body;
    res.json({users: users});
  }
});

router.patch('/:heroName', function(req, res) {
  const foundIndex = users.findIndex(user => user.name === req.params.heroName);

  if(foundIndex < 0) {
    res.json({resp: "User not found"});
  } else {
    if(req.body.name) {
      users[foundIndex].name = req.body.name;
    }
    if(req.body.age) {
      users[foundIndex].age = req.body.age;
    }

    res.json({users: users});
  }
});

module.exports = router;
