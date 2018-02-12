var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user)
  res.render('home-page', { user: req.user.handle });
});

router.get('/:handle', function(req, res, next){
  console.log(req.params.handle);
  res.render('home-page', { user: req.user.handle });
});

module.exports = router;
