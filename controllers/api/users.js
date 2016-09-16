'use strict'
var router = require('express').Router()
var bcrypt = require('bcrypt')
var jwt = require('jwt-simple')
var User = require('../../models/user')
var config = require('../../config')

router.get('/get', function(req, res, next) {  
    var auth = jwt.decode(req.headers['x-auth'], config.secret)  
    User.findOne({
        username: auth.username
    }, function(err, user) {    
        if (err) {
            return next(err)
        }    
        res.json(user);  
    })
});

router.post('/add', function(req, res, next) { 
    var user = new User({
        userId: req.body.userId,
        name: req.body.name,
        mobileNo: req.body.mobileNo
    });

    bcrypt.hash(req.body.password, 10, function(err, hash) {    
        if (err) {
            return next(err)
        }    
        user.password = hash;    
        user.save(function(err) {      
            if (err) {
                return next(err)
            }      
            res.sendStatus(201);    
        })  
    })
})

module.exports = router;
