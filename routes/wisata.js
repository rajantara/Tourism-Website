var express = require('express');
const { user } = require('pg/lib/defaults');
var router = express.Router();
var helpers = require('../helpers/util');


/* GET users listing. */
module.exports = (db) => {

    router.get('/', helpers.isLoggedIn, (req, res, next) => {
        res.render('wisata/wisata', {
        })
    });

    router.get('/add', helpers.isLoggedIn, (req, res, next) => {
        res.render('wisata/add', {
        })
    });

    router.get('/edit', helpers.isLoggedIn, (req, res, next) => {
        res.render('wisata/edit', {
        })
    });

    return router;
}







