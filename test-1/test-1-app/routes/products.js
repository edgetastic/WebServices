var express = require('express');
var router = express.Router();
const sql = require('../db');
const dateFormat = require("dateformat");
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

/* Create a Joi schema to validate post requests */
const schema = Joi.object({
    sku_id: Joi.string().required(),
    product_name: Joi.string().required(),
    expiration_date: Joi.date().required()
});

/* GET all the products */
router.get('/', function (req, res) {
    sql.query("SELECT * FROM products", function (error, results, fields) {
        if (error) throw error;
        let formatedResults = [];
        results.forEach(function (result) {
            let formatedResult = formatResult(result);
            formatedResults.push(formatedResult);
        });
        res.json(formatedResults);
    });
});

/* GET one product by Id */
router.get('/:productId', function (req, res) {
    sql.query("SELECT * FROM products WHERE id = ?", req.params.productId, function (error, results, fields) {
        if (error) throw error;
        let formatedResult = formatResult(results[0]);

        res.json(formatedResult);
    });
});

/* POST to create a new product */
router.post('/', validator.body(schema), function (req, res) {
    const data = req.body;
    sql.query("INSERT INTO products SET ?", data, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

/* PUT to update one product */
router.put('/:productId', function (req, res) {
    const data = req.body;

    sql.query("UPDATE products SET sku_id = ?, product_name = ?, expiration_date = ? WHERE id = ?", [data.sku_id, data.product_name, data.expiration_date, req.params.productId], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

/* DELETE to delete one product by Id */
router.delete('/:productId', function (req, res) {
    sql.query("DELETE FROM products where id = ?", req.params.productId, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

/* Function to calculate number of days */
function daysBetween(startDate, endDate) {
    const differenceInMilliseconds = new Date(endDate) - new Date(startDate);
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    // Return 0 if the product is expired
    return Math.round(differenceInDays) < 0 ? 0 : Math.round(differenceInDays);
}

/* Function date returns the formatted object */
function formatResult(result) {
    formatedResult = {};

    let expirationDate = dateFormat(result.expiration_date, "mmmm dS, yyyy");
    daysToExpire = daysBetween(new Date(), result.expiration_date);

    formatedResult.id = result.id;
    formatedResult.sku_id = result.sku_id;
    formatedResult.product_name = result.product_name;
    formatedResult.expiration_date = expirationDate;
    formatedResult.days_to_expire_from_today = daysToExpire;

    return formatedResult;
}
module.exports = router;