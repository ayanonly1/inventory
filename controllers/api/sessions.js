'use strict'
var router = require('express').Router();
var User = require('../../models/user');

var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../../config');

/**
 * @description -
 * @api-params {STRING} -
 * @example -
 * @return {JSON}-
 */

router.post('/login', function(req, res, next) {  
    User.findOne({
        userId: req.body.userId
    })
    .select('password')
    .select('userId')
    .exec(function(err, user) {    
        if (err) {
            return next(err);
        }
        console.log("user");
        console.log(user);
        if (!user) {
            return res.send(401);
        }
        bcrypt.compare(req.body.password, user.password, function(err, valid) {     
            if (err) {
                return next(err);
            }      
            console.log("valid");
            console.log(valid);
            if (!valid) {
                return res.send(401);
            }
            var token = jwt.encode({
                userId: user.userId
            }, config.secret);

            res.send(token);
        })  
    })
})

module.exports = router;
