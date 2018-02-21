var express = require('express');
var router = express.Router();
var userModel = require("../models/users");



var io = require('../io');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(req.user);
});


router.post("/", function(req, res, next){
    userModel.create({
        email: req.body.email, 
        password: req.body.password, 
        handle: req.body.handle,
    })
    .then(function(user){
        console.log(user);
        req.user = user.toObject();
        delete req.user.password;
        req.session.user = user;
        res.redirect(`/homepage/${user.handle}`);
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send(err.message);
    });

});

/* takes a requested handel and adds the current user to the array of 
people following the requested user  */
router.put('/follow/:handle', function(req, res, next){
  var follow = req.params.handle;
  var user = req.user.handle;
  userModel.updateOne({_id: req.user._id},{ $addToSet: {following:req.params.handle}})
  .then(function(done){
    console.log(done);
    io.joinRoom(user, follow);
    res.end();
  })
  .catch(function(err){
    console.log(err);
    res.end();
  });
})


router.put('/unfollow/:handle', function(req, res, next){
  var follow = req.params.handle;
  var user = req.user.handle;
  userModel.updateOne({_id: req.user._id},{ $pull: {following:req.params.handle}})
  .then(function(done){
    io.leaveRoom(user, follow);
    console.log(done);
    res.end();
  })
  .catch(function(err){
    console.log(err);
    res.end();
  });
})

module.exports = router;
