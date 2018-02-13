var express = require('express');
var router = express.Router();
var userModel = require("../models/users");




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(req.user);
});


router.post("/", function(req, res, next){
  userModel.findOne({$or: [{email: req.body.email}, {handle: req.body.handle}]}, (err, user) =>{
    if (err){
      console.log(err);
    }
    if (user == null){
      var newUser = new userModel({
        email: req.body.email, 
        password: req.body.password, 
        handle: req.body.handle,
      });
      newUser.save(function(error, user){
        if(error){
          console.log(error);
          res.sendStatus(500);
        }
        console.log("new user");
        res.sendStatus(200);
        //res.end();
      });
    } else {
      res.status(500).send("user already exsists");
    }
  });
});

/* takes a requested handel and adds the current user to the array of 
people following the requested user  */
router.put('/follow/:handle', function(req, res, next){
  console.log(req.params.handle);
  // res.render('home-page', { user: req.user.handle });

  userModel.updateOne({_id: req.user._id},{ $addToSet: {following:req.params.handle}})
  .then(function(done){
    console.log(done);
    res.end();
  })
  .catch(function(err){
    console.log(err);
    res.end();
  });
})


module.exports = router;
