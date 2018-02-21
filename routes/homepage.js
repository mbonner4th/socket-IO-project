var express = require('express');
var router = express.Router();

var tweetsModel = require('../models/tweets');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user)
  res.render('home-page', { user: req.user.handle });
});

router.get('/:handle', function(req, res, next){
  console.log(req.user);

  res.render('home-page', { 
    user: req.params.handle,
    currentUser: req.user,
   });
});

module.exports = router;
