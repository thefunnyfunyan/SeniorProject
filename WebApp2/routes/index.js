var express = require('express');
var router = express.Router();
var ejs = require('ejs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('partials/index', { title: 'RTAT' });
});

module.exports = router;
