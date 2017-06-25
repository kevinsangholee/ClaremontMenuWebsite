var express = require('express');
var db = require('../database.js');
var router = express.Router();
var async = require('async');
var bodyParser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res, next) {

  var allPromises = [];
  for(var s = 0; s < 7; s++) {
    for(var m = 0; m < 3; m++) {
      allPromises.push(db.getDaily(s,m));
    }
  }

  Promise.all(allPromises)
    .then(function(values) {
      res.render('index', {allFoodData: values});
    })

});

router.get('/getReviews/:id', function(req, res) {
  var id = req.params.id;
  db.getReviews(parseInt(id)).then(function(rows) {
    res.send(rows);
  })
})

module.exports = router;
