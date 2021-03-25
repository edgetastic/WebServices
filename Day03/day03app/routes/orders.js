const { json } = require('express');
const express = require('express');
const router = express.Router();

const orders = [
  {
    id: 1,
    productName: "Reebok shoes",
    price: 200,
    color: "black",
    quantity: 200
  },
  {
    id: 2,
    productName: "sports t shirt",
    price: 100,
    color: "blue",
    quantity: 100
  }
];

/* GET all orders */
router.get('/', function(req, res, next) {
  res.json(orders);
});

/* GET one order */
router.get('/:orderId', function(req, res, next) {
  const foundIndex = orders.findIndex(order => order.id == req.params.orderId);

  if(foundIndex < 0) {
    res.json({resp: "Order not found"});
  } else {
    res.json({order: orders[foundIndex]});
  }
});

/* POST one order  */
router.post('/', function(req, res) {
  orders.push(req.body);
  res.json({orders: orders});
});

/* PUT to edit all orders */
router.put('/', function(req, res) {
  orders = req.body.orders;
  res.json({orders: orders});
});

/* PUT to edit one order by Id */
router.put('/:orderId', function(req, res) {
  const foundIndex = orders.findIndex(order => order.id == req.params.orderId);

  if(foundIndex < 0) {
    res.json({resp: "User not found"});
  } else {
    users[foundIndex] = req.body;
    res.json({orders: orders});
  }
});

/* PATCH to edit one order by Id */
router.patch('/:orderId', function(req, res) {
  const foundIndex = orders.findIndex(order => order.id == req.params.orderId);

  if(foundIndex < 0) {
    res.json({resp: "User not found"});
  } else {
    if(req.body.id) {
      orders[foundIndex].id = req.body.id;
    }
    if(req.body.productName) {
      orders[foundIndex].productName = req.body.productName;
    }
    if(req.body.price) {
      orders[foundIndex].price = req.body.price;
    }
    if(req.body.color) {
      orders[foundIndex].color = req.body.color;
    }
    if(req.body.quantity) {
      orders[foundIndex].quantity = req.body.quantity;
    }

    res.json({orders: orders});
  }
});

/* DELETE to delete all orders */
router.delete('/', function(req, res) {
  orders = [];
  res.json({orders: orders});
});

/* DELETE to delete one order by id */
router.delete('/:orderId', function(req, res) {
  const foundIndex = orders.findIndex(order => order.id == req.params.orderId);

  if(foundIndex < 0) {
    res.json({resp: "Order not found."});
  } else {
    orders.splice(foundIndex, 1);
    res.json({orders: orders});
  }
});
module.exports = router;
