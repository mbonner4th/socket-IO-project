var express = require('express');
var router = express.Router();

var io = require('../io');

var tweetModel = require('../models/tweets');

/* GET users listing. */
router.get('/', function(req, res, next) {
  tweetModel.find({"User._id": req.user._id})
  .then(function(tweets){
    res.send(tweets);
  }).catch(function(err){
    console.log(err);
    res.end();
  });
});


function getFollowingTweets(followers){

  tweetModel.find({"handle": {"$in" : followers}})
  .then(function(tweets){
    console.log(tweets)
    res.send(tweets);

  }).catch(function(err){
    console.log(err);
  });

};

var joinRooms = function(user){
  var localIo =io.instance();
  for(var i = 0; i < req.user.following.length; i++){
    console.log(req.user.following[1]);
  }


}

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
