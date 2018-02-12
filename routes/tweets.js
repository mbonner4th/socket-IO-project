var express = require('express');
var router = express.Router();

var io = require('../io');

var tweetModel = require('../models/tweets');

/* GET users listing. */
router.get('/', function(req, res, next) {
  tweetModel.find({"User._id":req.user._id})
  .then(function(tweets){
    res.send(tweets);
  }).catch(function(err){
    console.log(err);
    res.end();
  });
});


router.post('/', function(req, res, next){
  console.log(req.user);
  tweetModel.create({
    body: req.body.body,
    User: req.user
  })
  .then(function(tweet){
    //broadcast stuff here
    //change to broadcase
    io.instance().emit("newTweet", tweet);
    res.send(tweet);
  });
});


module.exports = router;
