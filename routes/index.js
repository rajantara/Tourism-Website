var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var helpers = require('../helpers/util');

/* GET home page. */
module.exports = (db) => {

  router.get('/', (req, res, next) => {
    res.render('login', { pesanKesalahan: req.flash('pesanKesalahan') });
  });

  router.post('/login', (req, res) => {
    db.query('SELECT * FROM users where email = $1', [req.body.email], (err, data) => {
      if (err) {
        req.flash('pesanKesalahan', 'Terjadi Error Hubungi Administrator')
        return res.redirect('/');
      }
      if (data.rows.length == 0) {
        req.flash('pesanKesalahan', 'email atau password salah')
        return res.redirect('/');
      }
      bcrypt.compare(req.body.password, data.rows[0].pass, function (err, result) {
        if (err) {
          req.flash('pesanKesalahan', 'Terjadi Error Hubungi Administrator')
          return res.redirect('/');
        }
        if (!result) {
          req.flash('pesanKesalahan', 'email atau password salah')
          return res.redirect('/');
        }

        //lanjut
        let users = data.rows[0]
        delete users['pass']
        console.log(users)
        req.session.users = users;
        res.redirect('wisata')
      });
    })
  });

  router.get('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
      res.redirect('/')
    })
  });

  return router;

}
