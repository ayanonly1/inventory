'use strict'

var db = require('../db');

var user = db.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    name: {
    	type: String,
    	required: true
    },
    mobileNo: {
    	type: Number,
    	required: true
    },
    profileImage: {
    	type: String
    }
});

module.exports = db.model('User', user);
