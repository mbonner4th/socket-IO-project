var express = require('express');
var router = express.Router();

var userModel = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('auth');
});

router.post('/register', function(req, res, next){
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

router.post('/login', function(req, res, next){
    console.log(req.body);
    userModel.findOne({handle: req.body.handle, password: req.body.password})
    .then(function(user){
        console.log("hit");
        if(user != null){
            req.user = user.toObject();
            delete req.user.password;
            req.session.user = user;
            console.log("logged on");
            res.redirect(`/homepage/${user.handle}`);
        } else{
            res.render('auth', {error: "incoorect email or password"});
        }
    })
    .catch(function(err){
        console.log(err);
    });
});

router.get('/logout', function(req, res, next) {
    req.session.reset();
    console.log("no more session");
    res.redirect('/auth');
});


module.exports = router;
