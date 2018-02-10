var express = require('express');
var router = express.Router();

var io = require('../io');

var tweetModel = require('../models/tweets');

/* GET users listing. */
router.get('/', function(req, res, next) {
  tweetModel.find({}, function(err,tweets){
    if (err){
      console.log(err);
      res.sendStatus(500);
    }
  }).then(
  );
});


router.post('/', function(req, res, next){
  tweetModel.create({
    body: req.body.body,
  })
  .then(function(tweet){
    //broadcast stuff here
    //change to broadcase
    io.instance().emit("newTweet", tweet);
    res.send(tweet);
  });
});


module.exports = router;
