var express = require('express');
var router = express.Router();

var io = require('../io');

var tweetModel = require('../models/tweets');

/* GET current user's tweet. */
router.get('/', function(req, res, next) {
  tweetModel.find({"User._id": req.user._id})
  .then(function(tweets){
    res.send(tweets);
  }).catch(function(err){
    console.log(err);
    res.end();
  });
});


/* returns tweets from people the current user is following */
router.get("/following", function(req, res, next){
  console.log(req.user.following);
  tweetModel.find({"User.handle": {"$in" : req.user.following}})
  .then(function(tweets){
    res.send(tweets);
  }).catch(function(err){
    console.log(err);
  });

})


router.post('/', function(req, res, next){
  console.log(req.user);
  tweetModel.create({
    body: req.body.body,
    User: req.user
  })
  .then(function(tweet){
    //broadcast stuff here
    //change to broadcase
    console.log(req.user.handle + " Tweeted");
    io.instance().to(req.user.handle).emit("newTweet", tweet);
    res.send(tweet);
  });
});


module.exports = router;
