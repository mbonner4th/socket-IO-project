var express = require('express');
var router = express.Router();
var userModel = require("../models/users");



var io = require('../io');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(req.user);
});


router.post("/register", function(req, res, next){
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
        res.status(200).send("created");
    })
    .catch(function(err){
        console.log(err);
        res.status(400).send({errror: "email or handle already registered"});
    });
});

router.post('/login', function(req, res, next){
  console.log(req.body);
  userModel.findOne({handle: req.body.handle, password: req.body.password})
  .then(function(user){
      console.log(user);
      if(user != null){
          req.user = user.toObject();
          delete req.user.password;
          req.session.user = user;
          console.log("logged on");
          res.status(200).send("logged in");
      } else{
          res.status(400).send({error: "incoorect email or password"});
      }
  })
  .catch(function(err){
      console.log(err);
      res.status(400).send("notlogged in")
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
