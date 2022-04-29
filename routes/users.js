var express = require('express');
var router = express.Router();
var helpers = require('../helpers/util');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET users listing. */

module.exports = (db) => {

  router.get('/', helpers.isLoggedIn, (req, res, next) => {
    res.render('wisata/wisata', {
    })
  });

  router.get('/add', helpers.isLoggedIn, (req, res, next) => {
    res.render('users/add', {
      users: req.session.users
    })
  });


  router.post('/add', helpers.isLoggedIn, function (req, res) {
    const { email, pass, firstname, lastname } = req.body;
    bcrypt.hash(pass, saltRounds, function (err, hash) {
      if (err) return res.send(err)
      db.query('INSERT INTO users (email, pass, firstname, lastname) VALUES ($1, $2, $3, $4)', [email, hash, firstname, lastname], (err, data) => {
        if (err) return res.send(err)
        res.json(data.rows);
        console.log(data.rows)
      });
    });

  })



  return router;

}



