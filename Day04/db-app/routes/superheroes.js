var express = require('express');
var router = express.Router();
const sql = require('../db');

router.get('/', function (req, res) {
    sql.query("select * from superheroes", (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

router.post('/', function (req, res) {
    const data = req.body;
    sql.query('INSERT INTO superheroes SET ?', data, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.put('/:heroId', function (req, res) {
    const data = req.body;
    const heroId = req.params.heroId;

    sql.query('UPDATE superheroes SET name = ?, age = ?, image_url = ?, created_at = ? WHERE id = ?', [data.name, data.age, data.image_url, data.created_at, heroId], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.delete('/:heroId', function (req, res) {
    const heroId = req.params.heroId;

    sql.query('DELETE from superheroes WHERE id = ?', heroId, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

module.exports = router;